import { test, expect } from '@playwright/test'
import { customTest } from '../tests/utils/test-base'

import LoginPage from './pageObjects/LoginPage'
import DashboardPage from './pageObjects/DasboardPage'
import CheckoutPage from './pageObjects/CheckoutPage'
import PlaceorderPage from './pageObjects/PlaceorderPage'
import ConfirmationPage from './pageObjects/ConfirmationPage'
import OrderHistoryPage from './pageObjects/OrderHistoryPage'
import OrderSummaryPage from './pageObjects/OrderSummaryPage'
import POManager from './pageObjects/POManager'
//without converting  json object - string - convert to js object it is working
import dataSet from './TestData/placeOrder.json'
//convert json object - string - convert to js object  it is not working for me 
//import dataSet from JSON.parse(JSON.stringify('./TestData/placeOrder.json'))

for (const data of dataSet) {
    test(`Customer App Puchase Test ${data.productName}`, async ({ page }) => {
        //test.only('Customer App Puchase Test', async ({ page }) => {

        // **********************************************************/
        //note below code - we are removing hard code by using json file
        //dataSet is refering to placeOrder.json and from we are reading like 
        //->   dataSet.email
        //const productName = "ADIDAS ORIGINAL"
        // const email = 'nitesh@example.com'
        // const password = 'Lan#2070'
        // const code = 'ind'
        // const countryName = "India"
        //****************************************** */
        // note - the below commented code - we are creating object for all page and calling them
        // const loginPage = new LoginPage(page)
        // const dasboardPage = new DashboardPage(page)
        // const checkoutPage = new CheckoutPage(page, expect)
        // const placeorderPage = new PlaceorderPage(page, expect)
        // const confirmationPage = new ConfirmationPage(page, expect)
        // const orderHistoryPage = new OrderHistoryPage(page)
        // const orderSummaryPage = new OrderSummaryPage(page, expect)

        // Change - I declare on class call POManager in which we define all object creation 
        // of all page in one file and call intializte it theere and call all the required method from there
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
        const orderId = await confirmationPage.confirmOrder()
        await orderHistoryPage.orderHistory()
        await orderSummaryPage.orderSummary(orderId)


    })
}

customTest('Custom Fixture Demo', async ({ page, testDataOrder }) => {

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













