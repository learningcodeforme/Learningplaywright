import { test, expect, request } from '@playwright/test'
import APiUntils from './utils/APIUtils';

const loginPayload = { userEmail: "nitesh@example.com", userPassword: "Lan#2070" }
const orderPayLoad = { orders: [{ country: "Australia", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] }
const fackedPayLoad = { data: [], message: "No Orders" }
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUntils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayLoad)
})
test('Place Order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client/');
    // after reaching to page which request response we want to alter we pass it here
    // await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6698d059ae2afd4c0b297281',
    // note - 6698d059ae2afd4c0b297281 is customer id so when we run this test for other customer it fail to make it generic we pass " * " so it accept any customer id
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            // intercepting reponse -API response we need to hijack  and changes response we get from fackeed or mocked data  it and send to browser ( before it load data in UI )
            //step 1- we get the original  repsonse 
            const response = await page.request.fetch(route.request())
            // step 2 - we use fullfill() to send response to browser that it render in ui
            //step 3  - we have to send our modified response in fulfill
            //when user dont have any order in order page we ll get this  when we check https://rahulshettyacademy.com/client/dashboard/myorders
            // network tab we find below in get-order-for-customer
            //{"data":[],"message":"No Orders"}
            // step 4 - we create paylaod using {"data":[],"message":"No Orders"} and we send to this to browswer so it so no data in order page ( we are altering actual response with facked playload)
            // step 5 - fackedPayLoad is javascript value  but when we send to repsonse it should converted into json object
            // we should use JsonStringify() to convert js object to Json
            let body = JSON.stringify(fackedPayLoad)
            route.fulfill(
                {
                    response, ///we are sending same response 
                    body   // we send facked body
                    //when response send to browser with facked body( which we alter so it so not data in order page)
                })
        }

    )

    //Note - we need to alter the repsonse before my order get clicked
    await page.locator("[routerlink*='myorders']").click()
    //Note - we can get error saying - request context disposed 
    // it can happen because we are alter the repsonse body before  response  recieved so we need to give some time of pause ()
    // Note -it not happend to with me but to avoid such case we can use 
    // pass pass page detail whom our repsonse is waiting
    //waitForResponse()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')

    const message = await page.locator('.mt-4').textContent()
    console.log(message)
})