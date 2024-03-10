import { OpenCommand } from "./OpenCommand";
import type { ICommand } from "./ICommand";
import { TypingCommand } from "./TypingCommand";
import { ClickOnCommand } from "./ClickOnCommand";
import { StoreHeaderCommand } from "./StoreHeaderCommand";
import { SetHeaderCommand } from "./SetHeaderCommand";

const commandList = [
    new OpenCommand(''),
    new TypingCommand('', ''),
    new ClickOnCommand(''),
    new StoreHeaderCommand('', '', ''),
    new SetHeaderCommand('', '')
];

export function Parse(fileContent: string): ICommand[] {
    const commands: ICommand[] = [];
    fileContent
        .split('\n')
        .filter(n => !n.startsWith('#'))
        .forEach(line => {
            const parser = commandList.find(c => c.match(line));
            if (parser) {
                const command = parser.parse(line);
                command && commands.push(command);
            }
        });
    return commands;
}


