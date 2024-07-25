import { test, expect, request } from '@playwright/test'
import APiUntils from './utils/APIUtils';

const loginPayload = { userEmail: "nitesh@example.com", userPassword: "Lan#2070" }
const orderPayLoad = { orders: [{ country: "Australia", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] }
// let token;
// let orderId;
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUntils(apiContext, loginPayload)
    // response  got two value orderid and token
    // token is repsonse.token
    // orderID is reponse.orderID
    response = await apiUtils.createOrder(orderPayLoad)
})
test('Client App Login Test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("[routerlink='/dashboard/myorders']").click()
    console.log('order id ' + response.orderId)
    console.log("***************************************")
    // wait for table to be loaded
    await page.locator("tbody").waitFor()
    const rows = await page.locator('tbody tr')
    console.log('table item count ' + await rows.count())
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent()
        console.log('OrderrId from orderList - ' + rowOrderId)
        rows.nth(i).locator('button').first().click()
        break;
    }
    const orderIdDetails = await page.locator('.-main').textContent()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
})