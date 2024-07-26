import { test, expect, browser } from '@playwright/test'

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('nitesh@example.com')
    await page.locator('#userPassword').fill('Lan#2070')
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle')
    await context.storageState({ path: "session.json" })
    webContext = await browser.newContext({ storageState: "session.json" })
})
//const page = await context.newPage()
test('Test Case 1 - New Shop - Get text for all item  ', async ({ }) => {
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title())

})


test('New Shop Test  Select product case 2', async ({ }) => {

    const productName = "ZARA COAT 3"
    const email = 'nitesh@example.com'
    const page = await webContext.newPage()
    const products = page.locator('.card-body')
    await page.goto('https://rahulshettyacademy.com/client');

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



    await page.locator("[routerlink*='cart']").click()

    await page.locator('div li').first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy()
    // const product = await page.locator('.cartSection h3').textContent()
    // console.log('Item in cart -' + product)

    //await expect(page.locator('.cartSection h3').textContent()).toHaveText(productName)

    await page.locator("text=Checkout").click()
    //to type  and wait for auto selection to appear we need word by word type
    //so we use pressSequentially()
    await page.locator("[placeholder*='Country']").pressSequentially('Ind')
    //  get locator of all auto suggest drop dow after typing "ind"
    const dropdown = await page.locator('.ta-results')
    //waiting for dropdow  to load
    await dropdown.waitFor()
    //get the count of dropdown item
    const countryCount = await dropdown.locator('button').count()
    console.log("Total number of country in dropdown appear - " + countryCount)
    for (let i = 0; i < countryCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent()
        // console.log('country name ' + await dropdown.locator('button').nth(i).textContent())
        // get country namei in text variable and trim() it
        if (text.trim() === 'India') {
            await dropdown.locator('button').nth(i).click()
            break;
        }
    }
    // valiate the email appear in  confirmation page here email appear twice
    // so we use first()
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    await page.locator("text=Place Order ").click()
    // check or confirmation message
    await expect(page.locator(".hero-primary").first()).toHaveText(' Thankyou for the order. ')
    // grabe the order id
    const orderId = await page.locator('tr .ng-star-inserted td  .ng-star-inserted').textContent()
    console.log('order id ' + orderId)
    console.log("*******************************************")

    await page.locator("text= Orders History Page ").click()
    await page.locator("tbody").waitFor()
    //get the count of table row
    const rows = await page.locator('tbody tr')
    console.log('table item count ' + await rows.count())
    for (let i = 0; i < await rows.count(); i++) {
        // get the text of row id
        const rowOrderId = await rows.nth(i).locator('th').textContent()
        console.log('Order list - ' + rowOrderId)
        // click te view button we have two button view / delete so we use first()
        rows.nth(i).locator('button').first().click()
        break;
    }
    // In order confirmation page we get text of order id
    const orderIdDetails = await page.locator('.-main').textContent()
    // do validation with order id got at time of order placement with orderid appear after  clicking view button
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
    await page.pause()

})













