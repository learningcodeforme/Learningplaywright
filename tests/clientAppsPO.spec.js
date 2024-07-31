import { test, expect } from '@playwright/test'
import LoginPage from './pageObjects/LoginPage'
import DashboardPage from './pageObjects/DasboardPage'
import CheckoutPage from './pageObjects/CheckoutPage'
import PlaceorderPage from './pageObjects/PlaceorderPage'
import ConfirmationPage from './pageObjects/ConfirmationPage'
import OrderHistoryPage from './pageObjects/OrderHistoryPage'
import OrderSummaryPage from './pageObjects/OrderSummaryPage'


test.only('New Shop Test  Seelect product', async ({ page }) => {
    const productName = "ZARA COAT 3"
    const email = 'nitesh@example.com'
    const password = 'Lan#2070'
    const code = 'ind'
    const countryName = "India"

    const loginPage = new LoginPage(page)
    const dasboardPage = new DashboardPage(page)
    const checkoutPage = new CheckoutPage(page, expect)
    const placeorderPage = new PlaceorderPage(page, expect)
    const confirmationPage = new ConfirmationPage(page, expect)
    const orderHistoryPage = new OrderHistoryPage(page)
    const orderSummaryPage = new OrderSummaryPage(page, expect)

    await loginPage.goToPage()
    await loginPage.validLogin(email, password)
    await dasboardPage.searchProductAddCart(productName)
    await dasboardPage.navigateToCart()
    await checkoutPage.checkout()
    await placeorderPage.placeOrder(code, countryName, email)
    const orderId = await confirmationPage.confirmOrder()
    await orderHistoryPage.orderHistory()
    await orderSummaryPage.orderSummary(orderId)


})













