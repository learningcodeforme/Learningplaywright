import exp from "constants";

class OrderSummaryPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.orderDetails = page.locator('.-main')
    }

    async orderSummary(orderId) {
        await this.expect(orderId.includes(await this.orderDetails.textContent())).toBeTruthy()
    }
}

export default OrderSummaryPage;