import LoginPage from "./LoginPage"
import DashboardPage from "./DasboardPage"
import CheckoutPage from "./CheckoutPage"
import PlaceorderPage from "./PlaceorderPage"
import ConfirmationPage from "./ConfirmationPage"
import OrderHistoryPage from "./OrderHistoryPage"
import OrderSummaryPage from "./OrderSummaryPage"

class POManager {

    constructor(page, expect) {
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