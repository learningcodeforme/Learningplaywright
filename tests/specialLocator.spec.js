import { test, expect } from '@playwright/test'
test.only('speical locator', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    //getByLabel() -it is special method in playwright  which is used
    // get find the text if they part of label tag
    // it work in radio and checkbox
    // it will work in dropdown 
    // it will flakey while enter in textbox not recomanded 

    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.getByLabel('Employed').check()
    await page.getByLabel('Gender').selectOption('Female')
    // if we have tag name is placeholder we can use getByPlaceholder()
    await page.getByPlaceholder('Password').fill('1234abc')

    // getByRole()- based on type which you look 
    await page.getByRole("button", { name: 'Submit' }).click()

    //  getBytext() -it will look for text     
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible()

    await page.getByRole("link", { name: "Shop" }).click()

    // chainig of locator 
    // we use css the use filter() which internally use getByText()
    //then use getByRole() here we have only one button so we pass simply  button without name
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click()









})