import puppeteer from "puppeteer";
import { Parse } from "./dsl/Parser";
import { Execute } from "./dsl/Executor";
import { ExecutionContext } from "./dsl/ICommand";
const browser = await puppeteer.launch({
    headless: false
});
const page = await browser.newPage();

const dsl = `
open https://www.linkedin.com
type sang.cungoc@gmail.com for input[name="session_key"]
type ChangeItNow for input[name="session_password"]
click on button[type=submit]
store header set-cookie as page_cookie on https://www.linkedin.com/uas/login-submit
`
const context = new ExecutionContext();
const commands = Parse(dsl);
console.log(commands)

await Execute(page, commands, context);

await browser.close();


const browser2 = await puppeteer.launch({
    headless: false
});

const page2=await browser2.newPage();

const dsl2 = `
set header cookie from page_cookie
open https://www.linkedin.com/in/sangcu
`

const commands2 = Parse(dsl2);
await Execute(page2, commands2, context);
await page2.reload();
await page2.waitForSelector("#")
await browser2.close();