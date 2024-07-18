import { test, expect } from '@playwright/test'

//const page = await context.newPage()
test.only('New Shop Test case', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('nitesh@example.com')
    await page.locator('#userPassword').fill('Lan#2070')
    await page.locator('#login').click();
    // console.log(await page.locator('h5 b').first().textContent())
    console.log(" Without using .waitForLoadState('networkidle') - " + await page.locator('h5 b').allTextContents())
    // if data is loaded in ui based on service call( network tab some servies get all ui data from backend ) we can use waitForLoadState('networkidle') to wait until network tab beocome ideal  
    await page.waitForLoadState('networkidle')
    console.log(await page.locator('h5 b').allTextContents())

    //waitForLoadState('networkidle') is not stable as per playwright doc
    // we can use waitFor() it wait for loctor locator('h5 b') to visible but in our case 
    // return multiple elements so in our case we need first
    await page.locator('h5 b').first().waitFor();
    console.log(await page.locator('h5 b').allTextContents())




})