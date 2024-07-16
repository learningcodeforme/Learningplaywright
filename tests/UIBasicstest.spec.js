
import { test } from '@playwright/test'

// test case
//test is comming from '@playwright/test
// here broswer is fixture 
// it is use to set new context() -- we can send cookies and other details to 
// the browser 
// then  context.newPage() - to open page fresh page 
//page.goto -final open page in browser
test('Title of test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://playwright.dev/');

})

// if we dont have any context to set we can direcly use page fixture and open page 
// page.goto()
test('Title of test', async ({ page }) => {
    await page.goto('https://playwright.dev/');

})