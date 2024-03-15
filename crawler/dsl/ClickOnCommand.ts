import type { Page } from "puppeteer";
import type { ICommand } from "./ICommand";

export class ClickOnCommand implements ICommand {

    type = "click";
    selector: string = "";

    constructor(inputSelector: string) {
        this.selector = inputSelector;
    }

    match(text: string): boolean {
        const matched = text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith("click"); // Use optional chaining and nullish coalescing
        return matched;
    }

    parse(text: string): ICommand | null {
        const result = this.__parseText(text);
        if (!result) return null;
        return new ClickOnCommand(result.selector?.trim());
    }

    async execute(page: Page): Promise<void> {
        const input = await page.waitForSelector(this.selector);
        await input?.click();
    }
    __parseText(text: string): {selector: string } | null {
        const match = text.match(/^click on\s+(.+)+$/);

        if (match) {
            return {
                selector: match[1],
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}
