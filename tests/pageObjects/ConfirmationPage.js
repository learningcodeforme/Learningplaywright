import exp from "constants"

class ConfirmationPage {
    constructor(page, expect) {

        this.page = page
        this.expect = expect
        this.confirmationMessage = page.locator(".hero-primary")
        this.ordeIdDetails = page.locator('tr .ng-star-inserted td  .ng-star-inserted')

    }

    async confirmOrder() {
        await this.expect(this.confirmationMessage.first()).toHaveText(' Thankyou for the order. ')
        // grabe the order id  
        const orderId = await this.ordeIdDetails.textContent()
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
