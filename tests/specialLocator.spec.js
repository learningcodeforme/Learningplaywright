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






})