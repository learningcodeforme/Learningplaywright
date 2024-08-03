// Step1 - we import '@playwright/test' as base
import { test as baseTest } from '@playwright/test'
// in ts we need to declare the interfacd and we want to pass  typescript oject ( using key to access )
interface testDataOrder {
    productName: string;
    email: string;
    password: string;
    code: string;
    countryName: string;
};
// here we decalre object name : interfacename
const customText = baseTest.extend<{ testDataOrder: testDataOrder }>(
    {

        testDataOrder:
        {
            productName: "ADIDAS ORIGINAL",
            email: "nitesh@example.com",
            password: "Lan#2070",
            code: "ind",
            countryName: "India"
        }


    }
)
//We need to export the varaible to get avaiable to required file
export default customText