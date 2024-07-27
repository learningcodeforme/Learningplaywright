
import { test, expect } from '@playwright/test'
test('Browser Context Test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    // abort() --> it is used to blocked the network call 
    // to alter network all we use router ()
    //  here we block all request which having .jpg or ,.png or .jpeg at the end
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort())

    // page.on()--> 
    // playwright can track all the request/response  which is used in UI 
    //  on() -it is listener it invoked when event occur like request() resposnse()
    page.on('request', request => console.log('Request - ' + request.url()))
    page.on('response', response => console.log("Response - " + response.url(), "Response status - " + response.status()))

    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('rahulshettyacademy1')
    await page.locator('#password').fill('learning')
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)


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
    // await page.pause()
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
    //await page.pause()
    console.log(await page.locator('#username').textContent())
    // await page.pause()

    // to open any test in debug mode 
    // npx playwright test <#test name >   --headed --debug









})
