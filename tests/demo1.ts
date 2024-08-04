import { expect, type Locator, type Page, type Expect } from '@playwright/test';

//  we need to provide data type using : <Datatype> 
let message1: string = "Hello";
//In ts we cannot reassign the declare variable with other data type we go errror
message1 = "India"
console.log(message1)

let age: number = 12
console.log(age)

let isVisble: boolean = false;

let numberArray: number[] = [1, 2, 3,]

//when we use any data type it accept any type of value
let data: any = 'Ram'
data = 4;

// function demo
// we need to provide data type of parameter 
//  we need to provide return type of  function
function add(a: number, b: number): number {
    return a + b
}

console.log(add(3, 4))

// object in typescript 
let user: { name: string, age: number, location: string } = { name: "bob", age: 34 }

//*********** Object in javascript *********//
// let user1 = { name: "bob", age: 34 }

//In typescript we cannot add object property any time like js 
//it is valid in js but not in ts we need to define at declaration time
user.location = 'Patna'

// classes and constructor demo 

//import { expect, type Locator, type Page, type Expect} from '@playwright/test';

//we need to import page ,locator
class CheckoutPage {
    page: Page
    expect: Expect
    itemList: Locator
    productName: Locator
    checkoutButton: Locator
    constructor(page: Page, expect: Expect) {
        this.page = page;
        this.expect = expect;
        this.itemList = page.locator('div li')
        this.productName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkoutButton = page.locator("text=Checkout")
    }

    async checkout(productName: any) {
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