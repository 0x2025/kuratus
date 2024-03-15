import { expect, test, describe } from "bun:test";
import { Parse } from "./Parser";
import type { TypingCommand } from "./TypingCommand";
import type { OpenCommand } from "./OpenCommand";
import type { ClickOnCommand } from "./ClickOnCommand";
import type { StoreHeaderCommand } from "./StoreHeaderCommand";
import type { SetHeaderCommand } from "./SetHeaderCommand";
import type { WaitCommand } from "./WaitCommand";

describe("parser", () => {
    test("open [url]", async () => {

        const file = `
            open https://linkedin.com
    
            open https://kuratus.com
        `;
        const commands = Parse(file);
        expect(commands.length).toBe(2);
        expect((commands[0] as OpenCommand)?.url).toBe('https://linkedin.com');
        expect((commands[1] as OpenCommand)?.url).toBe('https://kuratus.com');
    });
    test("open [url]", async () => {

        const file = `
open https://linkedin.com
        `
        const commands = Parse(file);
        expect(commands.length).toBe(1);
        expect((commands[0] as OpenCommand)?.url).toBe('https://linkedin.com');
    });

    test('type [value] for [selector]', () => {
        const dsl = `
type sang.cu for .input
type sang.*cu for .input  
type sang.cu for #input
type sang.cu for #input > a > b
type sang.cu@123 for #input > a > b
type sang.cu@123! for #input > a > b
type sangcn@gmail.com for .input
type sangcn@gmail.com for input[name="session_key"]
type testingPass for input[name="session_password"]
`;
        const commands = Parse(dsl);
        expect((commands[0] as TypingCommand)?.value).toBe('sang.cu')
        expect((commands[0] as TypingCommand)?.selector).toBe('.input')
        expect((commands[1] as TypingCommand)?.value).toBe('sang.*cu')
        expect((commands[1] as TypingCommand)?.selector).toBe('.input')
        expect((commands[2] as TypingCommand)?.selector).toBe('#input')
        expect((commands[3] as TypingCommand)?.selector).toBe('#input > a > b')
        expect((commands[4] as TypingCommand)?.value).toBe('sang.cu@123')
        expect((commands[5] as TypingCommand)?.value).toBe('sang.cu@123!')
        expect((commands[6] as TypingCommand)?.value).toBe('sangcn@gmail.com')
        expect((commands[7] as TypingCommand)?.selector).toBe('input[name="session_key"]')
        expect((commands[8] as TypingCommand)?.selector).toBe('input[name="session_password"]')
    })
    test('click on [selector]', () => {
        const dsl = `
click on .input
click on  #input
click on  #input > a > b
click on button[type=submit]
`;
        const commands = Parse(dsl);
        expect((commands[0] as ClickOnCommand)?.selector).toBe('.input')
        expect((commands[1] as ClickOnCommand)?.selector).toBe('#input')
        expect((commands[2] as ClickOnCommand)?.selector).toBe('#input > a > b')
        expect((commands[3] as ClickOnCommand)?.selector).toBe('button[type=submit]')
    })

    test('store header [header_name] as [variable_name] on [target_url]', () => {
        const dsl = `
store header cookie as variable_name on https://abc.com
store header Authorization as session_cookie on https://abc.com
store header set-cookie as page_cookie on https://www.linkedin.com/uas/login-submit
`;
        const commands = Parse(dsl);
        expect((commands[0] as StoreHeaderCommand)?.headerName).toBe('cookie')
        expect((commands[0] as StoreHeaderCommand)?.variableName).toBe('variable_name')
        expect((commands[1] as StoreHeaderCommand)?.headerName).toBe('Authorization')
        expect((commands[1] as StoreHeaderCommand)?.variableName).toBe('session_cookie')
        expect((commands[2] as StoreHeaderCommand)?.headerName).toBe('set-cookie')
        expect((commands[2] as StoreHeaderCommand)?.variableName).toBe('page_cookie')
        expect((commands[2] as StoreHeaderCommand)?.url).toBe('https://www.linkedin.com/uas/login-submit')
    })

    test('set header [header_name] from [variable_name]', () => {
        const dsl = `
set header cookie from page_cookie
`;
        const commands = Parse(dsl);
        expect((commands[0] as SetHeaderCommand)?.headerName).toBe('cookie')
        expect((commands[0] as SetHeaderCommand)?.variableName).toBe('page_cookie')
    })
    test('wait [ms] for [selector]', () => {
        const dsl = `
wait 2000 for #global-nav__nav
`;
        const commands = Parse(dsl);
        expect((commands[0] as WaitCommand)?.timeout).toBe(2000)
        expect((commands[0] as WaitCommand)?.selector).toBe('#global-nav__nav')
    })
    test('wait for [selector]', () => {
        const dsl = `
wait 2 for #global-nav__nav
wait for #global-nav__nav
wait 0 for #global-nav__nav
wait   for #global-nav__nav
`;
        const commands = Parse(dsl);
        expect((commands[0] as WaitCommand)?.timeout).toBe(2)
        expect((commands[0] as WaitCommand)?.selector).toBe('#global-nav__nav')
        expect((commands[1] as WaitCommand)?.timeout).toBe(0)
        expect((commands[1] as WaitCommand)?.selector).toBe('#global-nav__nav')
        expect((commands[2] as WaitCommand)?.timeout).toBe(0)
        expect((commands[2] as WaitCommand)?.selector).toBe('#global-nav__nav')
        expect((commands[3] as WaitCommand)?.timeout).toBe(0)
        expect((commands[3] as WaitCommand)?.selector).toBe('#global-nav__nav')
    })
});
