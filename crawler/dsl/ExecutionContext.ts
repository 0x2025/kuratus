import { PutItem } from "../S3Database";
import { randomUUID } from "crypto";
import { IExecutionContext, IKeyStoreAsyncDb, LocalDb } from "./ICommand";


export class ExecutionContext implements IExecutionContext {
    id: string = randomUUID();
    persistent: IKeyStoreAsyncDb = {
        set: async (key: string, value: string) => {
            await PutItem(`${this.id}/${key}`, value);
        },
    };
    link: string = "";
    hash: any = {};
    database = new LocalDb();
}
