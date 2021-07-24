const puppeteer = require('puppeteer');

let REQUEST_URI = "https://lolnames.gg/en/br/"

async function makeRequest(nickname) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(REQUEST_URI + nickname)
    const isAvailable = await page.evaluate(() => {
        return document.querySelector('h4.text-center').innerText.includes('is available!')
    })
    const daysToBeAvailable = await page.evaluate(() => {
        document.querySelector('h4.text-center').innerText
    })
    console.log(isAvailable ? "not available" : "will be available in " + daysToBeAvailable)
    return isAvailable
}

makeRequest("Your Nickname")