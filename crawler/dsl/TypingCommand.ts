import type { Page } from "puppeteer";
import type { ICommand } from "./ICommand";

export class TypingCommand implements ICommand {

    type = "type";
    selector: string = "";
    value: string = "";

    constructor(value: string, inputSelector: string) {
        this.selector = inputSelector;
        this.value = value;
    }

    match(text: string): boolean {
        const matched = text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith("type"); // Use optional chaining and nullish coalescing
        return matched;
    }

    parse(text: string): ICommand | null {
        const result = this.__parseText(text);
        if (!result) return null;
        return new TypingCommand(result.value?.trim(), result.selector?.trim());
    }

    async execute(page: Page): Promise<void> {
        const input = await page.waitForSelector(this.selector);
        input?.focus();
        await page.type(this.selector,this.value);
    }

    __parseText(text: string): { value: string; selector: string } | null {
        const match = text.match(/^type\s+([\w-.*#\?\^%@!]+)\s+for\s+([\w-.*#>+ \"_=\\\[\]]+)$/);

        if (match) {
            return {
                value: match[1],
                selector: match[2],
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}