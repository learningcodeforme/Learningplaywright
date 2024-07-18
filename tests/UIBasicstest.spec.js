
import { test, expect } from '@playwright/test'


// test case
//test is comming from '@playwright/test
// here broswer is fixture 
// it is use to set new context() -- we can send cookies and other details to 
// the browser 
// then  context.newPage() - to open page fresh page 
//page.goto -final open page in browser
test('Browser Context Test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    // we can store locator in varible and use it 
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // locator to give locator value and fill to enter data 
    await userName.fill('rahulshettyacademy1')
    //await page.locator('#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('learning')
    await signIn.click()
    // await page.locator('#signInBtn').click()


    // playwright have intelligence to wait some time  before it start fail
    // in seleniun/cypress/webdriverio it fail ( because it will not wait)
    // to get text from locator we use 
    console.log(await page.locator("[style*='block']").textContent())
    // assertion expect to textContent() 
    //validate the text we use toContainText()
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    // //when weget mutiple item using single locator we need to passs 
    //.first() to get first 
    //nth()- we pass index 
    // console.log(await cardTitles.first().textContent())
    // console.log(await cardTitles.nth(2).textContent())
    //allTestContents() return array of element and it dont have intellegence to wait
    //because array can contians  zero or n number of element 
    //where as textContent() - return single element and when element not found it will wait

    const allTitles = await cardTitles.allTextContents()

    console.log(allTitles)


})

// if we dont have any context to set we can direcly use page fixture and open page 
// page.goto()
test('Page Context Test', async ({ page }) => {
    await page.goto('https://google.com');
    console.log(await page.title())
    await expect(page).toHaveTitle('Google')

})

test.only('UI Controls ', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdown = page.locator("select[class='form-control']")
    /*
    Dropdown 
 static drop down
 check for select class
    */
    await dropdown.selectOption('consult')
    page.pause(3000)
    await.page.locator().click()



})


