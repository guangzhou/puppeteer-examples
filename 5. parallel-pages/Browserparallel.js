/**
 * @name Screenshots parallel pages
 *
 * @desc Allow parallel processing screenshot
 */

const puppeteer = require('puppeteer')
const parallel = 6;
(async () => {
    const promises = []

    async function handle(i) {
        // return async () => {
            const browser = await puppeteer.launch({headless: false})
            const page = await browser.newPage();
            await page.setViewport({width: 1280, height: 800})
            await page.goto('https://www.baidu.com/s?wd=' + i)
            await console.log('截图开始 ', i)
            await page.bringToFront();
            await page.screenshot({path: 'wikipedia_' + i + '.png'})
            await console.log('截图结束 ', i)
            console.log('See screenshot: ' + i)
            await browser.close()
        // };
    }

    for (let i = 0; i < parallel; i++) {
        promises.push(new Promise((resolve, reject) => {
            console.log('初始化');
            resolve();
        }).then(handle(i)))
    }

    await Promise.all(promises)
    await  console.log('all finished')
})()
