const cookie='lidc="b=OB53:s=O:r=O:a=O:p=O:g=3885:u=684:x=1:i=1709031220:t=1709076228:v=2:sig=AQGyf4Y1_z2V4qE_g-JH5ebVVG0Ad0ET";JSESSIONID="ajax:2757291580443854908";li_at=AQEDAQYLtLUAPc7qAAABjeoy5VQAAAGODj9pVFYAMKdlUAZTsAnBiILaFqHt7u2ouRjqzf2UqC4pDfJa2c_FQOztzKBl7t34-nRu076T1WvhLcuNXd7Q_Mm5kGKulxK2i8NhbeoygFLzHAkTwfGwdtqH;liap=true;aam_uuid=15433924415409544421359282172900961314;AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19781%7CMCMID%7C15593933748977486091302117344884727785%7CMCAAMLH-1709636018%7C3%7CMCAAMB-1709636018%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1709038418s%7CNONE%7CvVersion%7C5.1.1;bcookie="v=2&b24b78b5-a0f3-468b-8329-8155e3ccc243";AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1;bscookie="v=1&20240227105337d97fcd97-51f3-4793-8561-a5cc7964fa13AQGnZgQNzzoX0jHh6ItOQnIG7TeDn-2Z";lang=v=2&lang=en-us;'
import puppeteer from 'puppeteer';
import fs from 'fs';
import util from  'util';

const readFile = util.promisify(fs.readFile);
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        devtools:true
    });

    const page = await browser.newPage();
    const cookieString = await readFile('cookie.json','utf8');
    console.log(JSON.parse(cookieString))
    
    // Navigate the page to a URL
    await page.setCookie(...JSON.parse(cookieString));
    await page.goto('https://www.linkedin.com/in/sangcu/');
    
    

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.waitForSelector('.xyyyyy')
    await browser.close();
})();