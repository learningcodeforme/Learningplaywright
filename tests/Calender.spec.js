import { test, expect } from '@playwright/test'

test('Calender handling ', async ({ page }) => {

    const month = 6;
    const year = 2027
    const day = 15
    let value = [];

    const exptectedDate = [month, day, year]
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')

    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label__labelText--from').click()
    await page.locator('.react-calendar__navigation__label__labelText--from').click()
    await page.getByText(year).click()
    await page.locator('.react-calendar__year-view__months__month').nth(month - 1).click()
    await page.locator('//abbr[text()=' + day + ']').click()
    const inputs = page.locator('.react-date-picker__inputGroup__input')
    //console.log("count of inputs - " + await inputs.count())
    for (let index = 0; index < await inputs.count(); ++index) {
        const value = await inputs.nth(index).getAttribute('value')
        console.log("value - " + value)
        //the below code wwill not work because it 
        expect(parseInt(value)).toEqual(exptectedDate[index])
        //  expect(parseInt(value)).toEqual(parseInt(exptectedDate[index]))


    }



})