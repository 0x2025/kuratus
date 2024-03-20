import type { HTTPResponse, Page } from "puppeteer";
import type { ICommand, IExecutionContext } from "./ICommand";

export class StoreHeaderCommand implements ICommand {

    type = "store header";
    headerName = "";
    variableName = "";
    url: string = "";
    constructor(headerName: string, variableName: string, url: string) {
        this.headerName = headerName;
        this.variableName = variableName;
        this.url = url;
    }
    match(text: string): boolean {
        return text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith(this.type); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const result = this.__parseText(text);
        return new StoreHeaderCommand(result?.headerName ?? '', result?.variableName ?? '', result?.url ?? '');
    }
    async execute(page: Page, context: IExecutionContext): Promise<void> {
        const interceptor = async (response: HTTPResponse) => {
            console.log(`${response.request().url()}`)
            if (response.request().url() == this.url) {
                const header = response.headers()[this.headerName];
                context.database.set(this.variableName, header);
            }
        };

        if (this.headerName == "set-cookie") {
            console.debug(`${this.url}`)
            await page.waitForResponse(this.url);
            const cookie = await page.cookies();
            context.database.set(this.variableName, JSON.stringify(cookie));
            return;
        }

        page.on('response', interceptor);
        await page.waitForResponse(this.url);
        page.off('response', interceptor);
    }
    __parseText(text: string): { headerName: string; variableName: string, url: string } | null {
        const match = text.match(/^store header\s+(.+)\s+as\s+(.+)\s+on\s+(.+)+$/);
        if (match) {
            return {
                headerName: match[1],
                variableName: match[2],
                url: match[3],
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}
