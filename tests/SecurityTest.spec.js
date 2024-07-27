import { test, expect, request } from '@playwright/test'

test("Security test request  itercept", async ({ page }) => {

    //login and reach to order page
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('nitesh@example.com')
    await page.locator('#userPassword').fill('Lan#2070')
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle')
    await page.locator('h5 b').first().waitFor();
    await page.locator("[routerlink*='myorders']").click()


    //  request url - https://rahulshettyacademy.com/api/ecom/order/get-orders-details?  id=66a44845ae2afd4c0b3489b7
    //  in above url we are passing product/ order id we pass as generic "*"  to test any order id
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        // the below line mean when we get any order id we route to page to specifice order id which is not exist for customer using  route.continue()
        // it  mean we intercepting the request 
        //route.continue({url:""}) - we need to pass url with orderId  which not belong to user so  we changing the request at run time 
        async route => await route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66a44845ae2afd4c0b3484553" })
    )

    // before click view button we have to intercept it so we use route()
    await page.locator("button:has-text('View')").first().click()

    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order')


})
