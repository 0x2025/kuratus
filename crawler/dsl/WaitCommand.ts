import type { Page } from "puppeteer";
import type { ICommand } from "./ICommand";

export class WaitCommand implements ICommand {

    type = "wait";
    selector: string = "";
    timeout: number;

    constructor(timeout: number, inputSelector: string) {
        this.selector = inputSelector;
        this.timeout = timeout;
    }

    match(text: string): boolean {
        const matched = text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith(this.type); // Use optional chaining and nullish coalescing
        return matched;
    }

    parse(text: string): ICommand | null {
        const result = this.__parseText(text);
        if (!result) return null;
        return new WaitCommand(result.timeout, result.selector?.trim());
    }

    async execute(page: Page): Promise<void> {
        await page.waitForSelector(this.selector, {
            timeout: (this.timeout ?? 3) * 1000 // convert from second to milisecond
        });
    }
    __parseText(text: string): { timeout: number, selector: string } | null {
        const match = text.match(/^wait(\s+)?(\d+)?\s+for\s+(.+)$/);
        if (!match) {
            throw new Error(`${text} is invalid wait command`);
        }

        const [, , timeoutStr, selector] = match;
        const timeout = !timeoutStr ? 0 : Number(timeoutStr);
        return { timeout, selector };
    }
}
