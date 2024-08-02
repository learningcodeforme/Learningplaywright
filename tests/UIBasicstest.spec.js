
import { test, expect } from '@playwright/test'
// test case
//test is comming from '@playwright/test
// here broswer is fixture 
// it is use to set new context() -- we can send cookies and other details to 
// the browser 
// then  context.newPage() - to open page fresh page 
//page.goto -final open page in browser
// to run the test in parallel mode if all test present in same file
//test.describe.configure({ mode: "parallel" })
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

test('UI Controls ', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdown = page.locator("select[class='form-control']")
    const documentLink = page.locator("[href*='documents-request']")

    /*
    Dropdown 
 static drop down
 check for select class
    */
    await dropdown.selectOption('consult')

    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()

    console.log('Radio Button  -' + await page.locator('.radiotextsty').last().isChecked())
    await expect(page.locator('.radiotextsty').last()).toBeChecked()

    await page.locator('#terms').click()
    console.log('checkbox is selected  -' + await page.locator('#terms').isChecked())

    await page.locator('#terms').uncheck()
    console.log('checkbox is  not selected  -' + await page.locator('#terms').isChecked())

    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()


    await page.locator('#terms').uncheck()
    console.log('checkbox is  not selected  -' + await page.locator('#terms').isChecked())

    await page.locator('#terms').click()
    // expect(await page.locator('#terms').isChecked()).toBeFalsy()
    expect(await page.locator('#terms').isChecked()).toBeTruthy()

    // await expect(documentLink).toHaveAttribute('class', 'blinkingTexts')

    await documentLink.click();

})
test("child window", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator('#username')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // waitforEevent() - will  return child window context but page is still not open 
    // if we give waitforEevent() after we click the link to page open then we cannot  catch page detials because page click 
    // page detials alreday trigger before page click() 
    // const childPage = context.waitForEvent('page')
    // page.locator("[href*='documents-request']").click()

    //so we have to work on promise  to handle 
    // Promise.all is array and all promises will reloved then it processed if any of promise 
    // not full fil it keep pending
    // good example of async to handle two item work all together 
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='documents-request']").click()
    ])

    const text = await newPage.locator('.red').textContent()
    console.log('Text from new Child page' + text)
    // need to grab the email id from child window and paste in username edit box of first window 
    const emailLineText = text.split("@")
    console.log(emailLineText)
    const email = emailLineText[1].split(" ")[0]
    console.log('Email id ' + email)

    // now call the insert the value get in email variable in parent page use
    await userName.fill(email)

    console.log(await page.locator('#username').textContent())


    // to open any test in debug mode 
    // npx playwright test <#test name >   --headed --debug









})
