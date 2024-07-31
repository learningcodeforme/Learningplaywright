class CheckoutPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.itemList = page.locator('div li')
        this.productName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkoutButton = page.locator("text=Checkout")
    }

    async checkout() {
        console.log('CLick checkout button')
        await this.itemList.first().waitFor();
        const bool = await this.productName.isVisible()
        await this.expect(bool).toBeTruthy()
        await this.checkoutButton.click()

    }

    async test() {
        await console.log('Check test')
        // await this.itemList.first().waitFor();
        // const bool = await this.productName.isVisible()
        // await expect(bool).toBeTruthy()
        // await this.checkout.click()

    }

}

export default CheckoutPage

