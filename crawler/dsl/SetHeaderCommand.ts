import type { HTTPRequest, Page } from "puppeteer";
import type { ICommand, IExecutionContext } from "./ICommand";

export class SetHeaderCommand implements ICommand {

    type = "set header";
    headerName = "";
    variableName = "";
    constructor(headerName: string, variableName: string) {
        this.headerName = headerName;
        this.variableName = variableName;
    }
    match(text: string): boolean {
        return text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith(this.type); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const result = this.__parseText(text);
        return new SetHeaderCommand(result?.headerName ?? '', result?.variableName ?? '');
    }
    async execute(page: Page, context: IExecutionContext): Promise<void> {
        const value = context.database.get(this.variableName);
        if(this.headerName=='cookie'){
            const cookies = JSON.parse(value);
            await page.setCookie(...cookies);
            return;
        }
        let header: Record<string, string> = {};
        header[this.headerName] = value;
        await page.setExtraHTTPHeaders(header);
    }
    __parseText(text: string): { headerName: string; variableName: string } | null {
        const match = text.match(/^set header\s+(.+)\s+from\s+(.+)+$/);
        if (match) {
            return {
                headerName: match[1],
                variableName: match[2],
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}
