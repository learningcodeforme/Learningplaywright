import LoginPage from "../pageObjects_ts/LoginPage"
import DashboardPage from "../pageObjects_ts/DasboardPage"
import CheckoutPage from "../pageObjects_ts/CheckoutPage"
import PlaceorderPage from "../pageObjects_ts/PlaceorderPage"
import ConfirmationPage from "../pageObjects_ts/ConfirmationPage"
import OrderHistoryPage from "../pageObjects_ts/OrderHistoryPage"
import OrderSummaryPage from "../pageObjects_ts/OrderSummaryPage"
import { expect, type Locator, type Page, type Expect } from '@playwright/test';

class POManager {
    page: Page
    expect: Expect
    loginPage: LoginPage
    dasboardPage: DashboardPage
    checkoutPage: CheckoutPage
    placeorderPage: PlaceorderPage
    confirmationPage: ConfirmationPage
    orderHistoryPage: OrderHistoryPage
    orderSummaryPage: OrderSummaryPage


    constructor(page: Page, expect: Expect) {
        this.page = page
        this.expect = expect
        this.loginPage = new LoginPage(page)
        this.dasboardPage = new DashboardPage(page)
        this.checkoutPage = new CheckoutPage(page, expect)
        this.placeorderPage = new PlaceorderPage(page, expect)
        this.confirmationPage = new ConfirmationPage(page, expect)
        this.orderHistoryPage = new OrderHistoryPage(page)
        this.orderSummaryPage = new OrderSummaryPage(page, expect)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dasboardPage
    }

    getCheckoutPage() {
        return this.checkoutPage
    }

    getPlaceorderPage() {
        return this.placeorderPage
    }

    getConfirmationPage() {
        return this.confirmationPage
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage
    }

    getOrderSummary() {
        return this.orderSummaryPage
    }
}

export default POManager