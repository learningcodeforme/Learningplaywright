class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body')
        this.cart = page.locator("[routerlink*='cart']")
    }

    async searchProductAddCart(productName) {
        const count = await this.products.count()
        for (let i = 0; i < count; ++i) {
            console.log('Inside for loop ')
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                console.log('inside if condition')
                await this.products.nth(i).locator("text=  Add To Cart").click()
                console.log('product clicked')
                break;
            }

        }


    }

    async navigateToCart() {
        await this.cart.click()

    }


}

export default DashboardPage;