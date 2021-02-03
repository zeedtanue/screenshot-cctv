const puppeteer= require('puppeteer');
const path= require('path');



let browserPromise = puppeteer.launch({product:"chrome",
    args:[
        '--no-sandbox',
    ]
});

const screenshot = async(req,res)=>{
    
    const url =  'https://www.youtube.com/watch?v=FZ02VT9XACY';
    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage()

    await page.goto(url);
    const ss =setInterval( async()=>{
        const date= new Date()
        const timeString = `${date.toDateString()} Time${date.getHours()}-${date.getMinutes()}-${ date.getUTCMilliseconds()}`
    
        await page.screenshot({
         type:'png',
        path: path.join(__dirname,`./public/live/screenshot${timeString.toString()}.png`),
    
    });
    console.log(`screenshot has been saved screenshot${timeString.toString()}.png`)},3*60*100)

    context.close()
}

screenshot()