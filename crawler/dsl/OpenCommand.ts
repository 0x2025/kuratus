import type { Page } from "puppeteer";
import type { ICommand, IExecutionContext } from "./ICommand";

export class OpenCommand implements ICommand {

    type = "open";
    url = "";
    constructor(url: string) {
        this.url = url;
    }
    match(text: string): boolean {
        return text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith("open"); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const targetUrl = text?.replace(new RegExp('  ', 'g'), '').trim().substring(4)?.trim(); // Extract URL directly after "open"
        return new OpenCommand(targetUrl);
    }
    async execute(page: Page, context: IExecutionContext): Promise<void> {
        await page.goto(this.url);
        context.link = this.url;
    }
}
