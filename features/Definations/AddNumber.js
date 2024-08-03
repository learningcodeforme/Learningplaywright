const { Given, When, Then } = require('@cucumber/cucumber')

Given('Number are provided', function () {
    num1 = 1
    num2 = 10
    return console.log("number are" + num1, num2)

});

When('sum of two numbers', function () {
    sum = num1 + num2
    return console.log("Addition perfomered")

});

Then('Display sum of two numbers', function () {
    return console.log("sum of number are" + sum)
});