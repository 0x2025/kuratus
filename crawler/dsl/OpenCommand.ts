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
            .startsWith(this.type); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const match = text.replace(new RegExp('  ', 'g'), '').match(/^open\s+(.+)+$/);
        if (!match) {
            throw new Error(`Invalid open command ${text}`)
        }
        return new OpenCommand(match[1]);
    }
    async execute(page: Page, context: IExecutionContext): Promise<void> {
        await page.goto(this.url);
        context.link = this.url;
    }
}
