class PlaceorderPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect
        this.countryInput = page.locator("[placeholder='Select Country']")
        this.dropdownItem = page.locator('.ta-results')
        this.emailText = page.locator(".user__name [type='text']")
        this.placeOrderButton = page.locator("text=Place Order ")


    }

    async placeOrder(code, countryName, email) {
        console.log('Inside placeOrder function ')
        console.log('country name - ' + countryName)

        await this.countryInput.pressSequentially(code)
        const dropdown = await this.dropdownItem
        await dropdown.waitFor()
        await this.dropdownItem.waitFor()
        const countryCount = await dropdown.locator('button').count()
        await this.dropdownItem.locator('button').count()
        console.log("Total number of country in dropdown appear - " + await this.dropdownItem.locator('button').count())
        for (let i = 0; i < await this.dropdownItem.locator('button').count(); ++i) {
            const text = await this.dropdownItem.locator('button').nth(i).textContent()
            console.log("country name-" + text)
            if (text.trim() === countryName) {
                await this.dropdownItem.locator('button').nth(i).click()
                break;
            }
        }
        // await this.expect(this.emailText.first()).toHaveText(email)
        await this.placeOrderButton.click()
    }

}


export default PlaceorderPage;