import type { HTTPResponse, Page } from "puppeteer";
import type { ICommand, IExecutionContext } from "./ICommand";

export class PersistentToDatabaseCommand implements ICommand {

    type = "persistent";
    headerName = "";
    variableName = "";
    url: string = "";
    targetName: any = "";
    constructor(variableName: string, targetName: string | null) {
        this.variableName = variableName;
        this.targetName = targetName;
    }

    match(text: string): boolean {
        return text?.toLowerCase()
            .replace(new RegExp('  ', 'g'), '')
            .startsWith(this.type); // Use optional chaining and nullish coalescing
    }

    parse(text: string): ICommand {
        const result = this.__parseText(text);
        return new PersistentToDatabaseCommand(result?.variableName ?? '', result?.targetName ?? '');
    }

    async execute(page: Page, context: IExecutionContext): Promise<void> {
        const value = context.database.get(this.variableName);
        await context.persistent.set(this.variableName, value);
    }

    __parseText(text: string): { variableName: string, targetName: string } | null {
        const pattern = /^persistent\s+([\w\-]+)(?:\s+to\s+([\w\-_]*))?$/;
        const match = text.match(pattern);
        console.debug('match2', match)
        if (match) {

            return {
                variableName: match[1],
                targetName: match[2] ?? match[1]
            };
        } else {
            return null; // Handle cases where the text doesn't match the pattern
        }
    }
}
