import exp from "constants";
import { expect, type Locator, type Page, type Expect } from '@playwright/test';
class OrderSummaryPage {
    page: Page
    expect: Expect
    orderDetails: Locator

    constructor(page: Page, expect: Expect) {
        this.page = page;
        this.expect = expect;
        this.orderDetails = page.locator('.-main')
    }

    async orderSummary(orderId: any) {
        await this.expect(orderId.includes(await this.orderDetails.textContent())).toBeTruthy()
    }
}

export default OrderSummaryPage;