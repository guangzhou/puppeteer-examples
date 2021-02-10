/**
 * @name Screenshots parallel pages
 *
 * @desc Allow parallel processing screenshot
 */

const puppeteer = require('puppeteer')
const parallel = 5;

(async () => {
    puppeteer.launch({headless: false}).then(async browser => {
        const promises = []
        for (let i = 0; i < parallel; i++) {
            console.log('Page ID Spawned', i)
            promises.push(browser.newPage().then(async page => {
                await page.setViewport({width: 1280, height: 800})
                await page.goto('https://en.wikipedia.org/wiki/' + i)
                await console.log('截图开始 ', i)
                await page.screenshot({path: 'wikipedia_' + i + '.png'})
                await console.log('截图结束 ', i)
            }))
        }
        await Promise.all(promises)
        await browser.close()
        await console.log("11111");
    })
})()
