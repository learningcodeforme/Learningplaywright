import { test, expect } from '@playwright/test'
import { type Locator, type Page, type Expect } from '@playwright/test';
import POManager from './pageObjects_ts/POManager'
import dataSet from './TestData/placeOrder.json'
import customTest from './utils_ts/test-base'


for (const data of dataSet) {

    test(`Customer App Puchase Test using TypeScript ${data.productName}`, async ({ page }) => {


        const poManager = new POManager(page, expect)
        const loginPage = poManager.getLoginPage()
        const dasboardPage = poManager.getDashboardPage()
        const checkoutPage = poManager.getCheckoutPage()
        const placeorderPage = poManager.getPlaceorderPage()
        const confirmationPage = poManager.getConfirmationPage()
        const orderHistoryPage = poManager.getOrderHistoryPage()
        const orderSummaryPage = poManager.getOrderSummary()


        await loginPage.goToPage()
        await loginPage.validLogin(data.email, data.password)
        await dasboardPage.searchProductAddCart(data.productName)
        await dasboardPage.navigateToCart()
        await checkoutPage.checkout(data.productName)
        await placeorderPage.placeOrder(data.code, data.countryName, data.email)
        const orderId: any = await confirmationPage.confirmOrder()
        await orderHistoryPage.orderHistory()
        await orderSummaryPage.orderSummary(orderId)


    })
}

customTest('Custom Fixture Demo using Typescript', async ({ page, testDataOrder }) => {

    const poManager = new POManager(page, expect)
    const loginPage = poManager.getLoginPage()
    const dasboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckoutPage()
    const placeorderPage = poManager.getPlaceorderPage()
    const confirmationPage = poManager.getConfirmationPage()
    const orderHistoryPage = poManager.getOrderHistoryPage()
    const orderSummaryPage = poManager.getOrderSummary()


    await loginPage.goToPage()
    await loginPage.validLogin(testDataOrder.email, testDataOrder.password)
    await dasboardPage.searchProductAddCart(testDataOrder.productName)
    await dasboardPage.navigateToCart()
    await checkoutPage.checkout(testDataOrder.productName)
    await placeorderPage.placeOrder(testDataOrder.code, testDataOrder.countryName, testDataOrder.email)
    const orderId = await confirmationPage.confirmOrder()
    await orderHistoryPage.orderHistory()
    await orderSummaryPage.orderSummary(orderId)

})













