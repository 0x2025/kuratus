import type { HTTPRequest, Page } from "puppeteer";
import type { ICommand, IExecutionContext } from "./ICommand";

export class ReadContentCommand implements ICommand {

    type = "read";
    selector = "";
    variableName = "";
    constructor(selector: string, variableName: string) {
        this.selector = selector;
        this.variableName = variableName;
    }
    match(text: string): boolean {
        return text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith(this.type); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const result = this.__parseText(text);
        return new ReadContentCommand(result?.selector ?? '', result?.variableName ?? '');
    }

    async execute(page: Page, context: IExecutionContext): Promise<void> {
        const element = await page.waitForSelector(this.selector);
        const value = await element?.evaluate(e=>e.innerHTML);
        console.debug(value);
        console.debug(this.variableName);
        context.database.set(this.variableName, value ?? '');
    }
    __parseText(text: string): { selector: string; variableName: string } | null {
        const match = text.match(/^read\s+(.+)\s+to\s+(.+)+$/);
        if (match) {
            return {
                selector: match[1],
                variableName: match[2],
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}
