import { test, expect } from '@playwright/test'

test("Popup Validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://www.google.com/")
    // await page.goBack()
    // await page.goForward()
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed    -text')).toBeHidden()
    // in playwright handle javascript popup we use 
    // on() which accpect event and it crossponding method 
    // any popup is called dialog and and we need to pass specific method to perform action
    //  dialog.accept() - click ok 
    // dialog.dismiss() - to click cancel 
    // we define it anywhere and when pop appear it work 
    page.on('dialog', dialog => dialog.accept())
    //page.on('dialog', dialog => dialog.dismiss())

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