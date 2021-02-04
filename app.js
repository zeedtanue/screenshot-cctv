const puppeteer= require('puppeteer');
const path= require('path');
const { throws, rejects } = require('assert');
const { setInterval } = require('timers');



let browserPromise = puppeteer.launch({product:"chrome",
    args:[
        '--no-sandbox',
        
    ]
});

const screenshot = async()=>{
    try {
        
    const url =  'https://thiscatdoesnotexist.com/';
    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage()

    await page.goto(url);
    await page.waitForTimeout(4000)
    
    const date= new Date()
    const timeString = `${date.toDateString()} Time${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${ date.getUTCMilliseconds()}`
    
    await page.screenshot({
      type:'png',
      path: path.join(__dirname,`./public/live/screenshot${timeString.toString()}.png`),
    });
    console.log(`screenshot has been saved screenshot${timeString.toString()}.png`)
    await context.close()
        
    } catch (error) {
        console.log(error)
    }
    
}

setInterval(screenshot,30000)