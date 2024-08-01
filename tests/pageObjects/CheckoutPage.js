class CheckoutPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.itemList = page.locator('div li')
        this.productName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkoutButton = page.locator("text=Checkout")
    }

    async checkout(productName) {
        console.log('CLick checkout button')
        await this.itemList.first().waitFor();
        // here we have to pass product name in locator so we create one getProductorLocator() in which we pass "productName"
        const bool = await this.getProductLocator(productName).isVisible();
        await this.expect(bool).toBeTruthy()
        await this.checkoutButton.click()

    }

    //In getProductLocator() we simple return the locaotor after attaching productname
    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

}

export default CheckoutPage

