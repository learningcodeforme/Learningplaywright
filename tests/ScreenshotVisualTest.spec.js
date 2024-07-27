import { test, expect } from '@playwright/test'

test("Popup Validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed    -text')).toBeHidden()
    page.on('dialog', dialog => dialog.accept())
    await page.locator('#alertbtn').click()
    //mouse hover 
    await page.locator('#mousehover').hover()
    await page.goto("https://www.google.com/")
    await page.goBack()
    await page.locator('#confirmbtn').waitFor()
    await page.locator('#confirmbtn').click()
    page.on('dialog', dialog => dialog.dismiss())
    // we need to got to frame use "frameLocator" and stored them in on variable
    const framesPage = page.frameLocator('#courses-iframe')
    // in frame we have onther webpage we look for locator like link - lifetime
    // but it appear 2 times but one is invisible mode  so to select visible locator 
    // we use :visble with locator
    await framesPage.locator("li a[href*='lifetime']:visible").click()
    const text = await framesPage.locator('.text h2').textContent()
    console.log("Number of Subscriber - " + text.split(" ")[1])
})

test('Sreenshot partail and full page', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator('#displayed-text')).toBeVisible()
    // partial take screensot ( specfic area screenshot)
    await page.locator('.class1').first().screenshot({ path: "patialScreenshot.png" })

    await page.locator('#hide-textbox').click()
    // take screenshot on entire page 
    await page.screenshot({ path: 'screenshot.png' })
    await expect(page.locator('#displayed    -text')).toBeHidden()
})


// take screeshot and save it project and run code again in next day and we can  take screenshot and compare   with old screenshot  it is visual testing

test.only('Visual testing using playwright', async ({ page }) => {
    await page.goto('https://www.google.com/.com')
    expect(await page.screenshot()).toMatchSnapshot('test.png')

    // // note when we run first time we dont have any iamge so it fail but save image in project so when we run second time it will pass  if image  matches 

    // Error: A snapshot doesn't exist at C:\learning\code\Learningplaywright\tests\ScreenshotVisualTest.spec.js-snapshots\test-chromium-win32.png, writing actual.
    //seco
})