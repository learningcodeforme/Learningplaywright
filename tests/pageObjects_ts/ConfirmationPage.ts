import exp from "constants"
import { expect, type Locator, type Page, type Expect } from '@playwright/test';

class ConfirmationPage {
    page: Page
    expect: Expect
    confirmationMessage: Locator
    ordeIdDetails: Locator
    constructor(page: Page, expect: Expect) {

        this.page = page
        this.expect = expect
        this.confirmationMessage = page.locator(".hero-primary")
        this.ordeIdDetails = page.locator('tr .ng-star-inserted td  .ng-star-inserted')

    }

    async confirmOrder() {
        await this.expect(this.confirmationMessage.first()).toHaveText(' Thankyou for the order. ')
        // grabe the order id  
        let orderId: any = await this.ordeIdDetails.textContent()
        console.log('order id ' + orderId)
        const formattedOrderId = orderId.split("|")
        console.log('Formatted Order id - ' + formattedOrderId[1].trim())
        const actualOrderId = formattedOrderId[1].trim()
        console.log("*******************************************")
        //go to order tab and click()
        console.log('actualOrderId- ' + actualOrderId)
        return actualOrderId;

    }
}

export default ConfirmationPage;
