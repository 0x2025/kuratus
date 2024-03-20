import type { Page } from "puppeteer";


export interface ICommand {
    type: string;
    match(text: string): boolean;
    parse(text: string): ICommand | null;
    execute(page: Page, context?: IExecutionContext): Promise<void>;
}

export interface IKeyStoreDb {
    set: (key: string, value: string) => void,
    get: (key: string) => string
}
export interface IKeyStoreAsyncDb {
    set: (key: string, value: string) => Promise<void>,
}

export class LocalDb implements IKeyStoreDb {
    _db: any = {};
    set(key: string, value: string): void {
        this._db[key] = value;
    }
    get(key: string): string {
        return this._db[key];
    };
}

export interface IExecutionContext {
    id: string;
    link: string;
    database: IKeyStoreDb,
    persistent: IKeyStoreAsyncDb
}

