import puppeteer from 'puppeteer';
import fs from 'fs';
import util from  'util';

const writeFile = util.promisify(fs.writeFile);

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://linkedin.com');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type('input[name=session_key]', 'sangcn@gmail.com');
    await page.type('input[name=session_password]', 'Azb26945')

    // Wait and click on first result
    //const searchResultSelector = '.devsite-result-item-link';
    //await page.waitForSelector(searchResultSelector);
    //   const signInButton = await page.waitForSelector('div ::-p-text(Sign in)');
    //   await signInButton.click('button');

    // Locate the full title with a unique string
    //   const textSelector = await page.waitForSelector(
    //     'text/Customize and automate'
    //   );
    //   const fullTitle = await textSelector?.evaluate(el => el.textContent);

    //   // Print the full title
    //   console.log('The title of this blog post is "%s".', fullTitle);
    await page.waitForResponse(res => {
        if (res.url().startsWith('https://www.linkedin.com/feed/') && res.status() === 200) {
            // const cookies = res.headers()['set-cookie'];
            // console.log(cookies);
            return true;
        }
        return false;

    });

    const cookies = await page.cookies();

    console.log(cookies);
    await writeFile('cookie.json', JSON.stringify(cookies));
    await browser.close();
})();