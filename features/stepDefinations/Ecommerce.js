
const { Given, When, Then } =require('@cucumber/cucumber');
// const{ test,expect } =require('@playwright/test');
//  const { chromium } =require('@playwright'); 

         Given('Login to Ecommerce website with {string} and {string}', async function (username, password) {
          console.log('Ecommerce application')
         //  const browser=   await chromium.launch()
         //  const context = await browser.newContext()
         //   const page = await context.newPage()
          
        
         //   const poManager = new POManager(page)
         // //  const loginPage = poManager.getLoginPage()
         // //  await loginPage.goToPage()
         // //  await loginPage.validLogin(username, password)
         });

         When('Search {string} and Add to the cart', async  function (productName) {
        
            console.log('Add the product in cart')
         
         });

  
         Then('checkout the product {string}', async  function (productName) {
         
            console.log('Checkout the product')
         });

   
         Then('Enter the valid details and place order', function () {
           
            console.log('Enter the valid details and place order')
         });

   

         Then('Verify  the order in confirm', async  function () {
         
          console.log('Verify  the order in confirm')
         });


         Then('check the order history', async function () {
           
            console.log('check the order history')
         });

         Then('check the order summary',async  function () {
           
            console.log('check the order summary')
          
         });
