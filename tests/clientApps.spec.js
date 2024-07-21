import { test, expect } from '@playwright/test'

//const page = await context.newPage()
test('New Shop Test case', async ({ page }) => {
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
    console.log(await page.locator('.card-body b').allTextContents())

})

//const page = await context.newPage()
test.only('New Shop Test  Seelect product', async ({ page }) => {

    const productName = "ZARA COAT 3"
    const products = page.locator('.card-body')
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('nitesh@example.com')
    await page.locator('#userPassword').fill('Lan#2070')
    await page.locator('#login').click();
    // wait for network should become ideal 
    await page.waitForLoadState('networkidle')
    // console.log(await page.locator('h5 b').allTextContents())
    const count = await products.count()

    for (let i = 0; i < count; ++i) {
        console.log('Inside for loop ')
        if (await products.nth(i).locator("b").textContent() === productName) {
            console.log('inside if condition')
            await products.nth(i).locator("text=  Add To Cart").click()
            console.log('product clicked')
            break;
        }

    }

    // two type locator  based on text in playright 
    // example -  await products.nth(i).locator("text=  Add To Cart").click()
    //based on text we create locator uning "text"

    await page.locator("[routerlink*='cart']").click()
    //when we click on cart button we see some time take to load the content oof cart 
    // when we check for  page.locator("h3:has-text('ZARA COAT 3')").isVisible() it might fail because it visible() dont have atuo wait
    //we have to find some locator for which we wait  so we check for list of item 
    //loading in cart section using page.locator('div li').first().waitFor();
    await page.locator('div li').first().waitFor();
    // playwirght have text based locator  where we pass tag name followed by
    // "has-text" below in example
    // isVisible()
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy()
    // const product = await page.locator('.cartSection h3').textContent()
    // console.log('Item in cart -' + product)

    //await expect(page.locator('.cartSection h3').textContent()).toHaveText(productName)

})