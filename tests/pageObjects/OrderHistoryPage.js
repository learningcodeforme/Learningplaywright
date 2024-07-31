class OrderHistoryPage {
    constructor(page) {

        this.page = page
        this.orderHistoryPageText = page.locator("text= Orders History Page ")
        this.table = page.locator("tbody")
        this.tableRow = page.locator('tbody tr')

    }

    async orderHistory() {

        //********************oder history page*********************** */
        await this.orderHistoryPageText.click()
        await this.table.waitFor()
        //get the count of table row
        const rows = await this.tableRow
        console.log('table item count ' + await rows.count())
        for (let i = 0; i < await rows.count(); i++) {
            // get the text of row id 
            const rowOrderId = await rows.nth(i).locator('th').textContent()
            console.log('Order list - ' + rowOrderId)
            // click te view button we have two button view / delete so we use first() 
            rows.nth(i).locator('button').first().click()
            break;


        }

    }


}

export default OrderHistoryPage;