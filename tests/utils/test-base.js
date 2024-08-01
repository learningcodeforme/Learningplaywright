// Step1 - we import '@playwright/test' as base
import base from '@playwright/test'

// step 2 -we extend our base to base.test.extend

//Step 3.1 -- we export base.test.extend as "customText" and it our custom fixtue
//In test  we use test but now we use customTest 
exports.customTest = base.test.extend(
    {

        //  Step 3 - create one js object which have value
        //  in js object key is not under quoutes
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