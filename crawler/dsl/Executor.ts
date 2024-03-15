import { Page } from 'puppeteer';
import { type ICommand, type IExecutionContext } from "./ICommand";

export async function Execute(page: Page, commands: ICommand[], context: IExecutionContext) {
    for (const command of commands) {
        await command.execute(page, context)
    }
}