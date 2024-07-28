
// to use excel.js we need to import it
import ExcelJS from 'exceljs'
import { test, expect } from '@playwright/test'
//define a function 

async function readExcel(worksheet, searchText) {
    const output = { row: -1, column: -1 }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = cellNumber;
            }
        })
    })
    return output;
}
async function writeExcel(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)
    const cell = await worksheet.getCell(output.row, output.column + change.colChange)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}

test('upload download  excel validation', async ({ page }) => {
    // go to the page

    const textSearch = 'Mango'
    const updatedPrice = '350'
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')

    //when we click download it take some time file to get download based on internet speed so we need to make the wait before write operation works 
    // we have to use waitForEvent()  - waiting for event here we are waiting for download  event

    const downloadPromise = page.waitForEvent("download")
    // click on "Download button "
    await page.getByRole('button', { name: 'Download' }).click();
    //now we call downloadPromise ( which is for waitng download event to be complete)
    //await downloadPromise;

    const download = await downloadPromise;
    const downloadsPath = 'C:/Users/nites/Downloads/';
    // we use saveAS() to save the file 
    await download.saveAs('${downloadsPath}download.xlsx');

    // call the writeExcel function 
    await writeExcel(textSearch, updatedPrice, { rowChange: 0, colChange: 2 },
        '${downloadsPath}download.xlsx')
    // click on upload file button
    // await page.locator("#fileinput").waitFor()
    await page.locator("#fileinput").click()
    // in playwright it cannot handle the window ( pc event to click button)
    // so in playwright it setInputFiles() to upload file from window 
    // note - it work on only file type tag
    await page.locator("#fileinput").setInputFiles('${downloadsPath}download.xlsx')
    // we create one locator where our desried text is present in our case "Mango"
    const textLocator = await page.getByText(textSearch)
    // we are now seraching in the row level by giving getByRole() then use filter with our new locator
    const dersiredRow = await page.getByRole('row').filter({ has: textLocator })
    // then validate the value of price with price we used to uplaod the excel
    await expect(dersiredRow.locator('#cell-4-undefined')).toContainText(updatedPrice)





})