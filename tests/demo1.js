"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//  we need to provide data type using : <Datatype> 
var message1 = "Hello";
//In ts we cannot reassign the declare variable with other data type we go errror
message1 = "India";
console.log(message1);
var age = 12;
console.log(age);
var isVisble = false;
var numberArray = [1, 2, 3,];
//when we use any data type it accept any type of value
var data = 'Ram';
data = 4;
// function demo
// we need to provide data type of parameter 
//  we need to provide return type of  function
function add(a, b) {
    return a + b;
}
console.log(add(3, 4));
// object in typescript 
var user = { name: "bob", age: 34 };
//*********** Object in javascript *********//
// let user1 = { name: "bob", age: 34 }
//In typescript we cannot add object property any time like js 
//it is valid in js but not in ts we need to define at declaration time
user.location = 'Patna';
// classes and constructor demo 
//import { expect, type Locator, type Page, type Expect} from '@playwright/test';
//we need to import page ,locator
var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(page, expect) {
        this.page = page;
        this.expect = expect;
        this.itemList;
        page.locator('div li');
        this.productName = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.locator("text=Checkout");
    }
    CheckoutPage.prototype.checkout = function (productName) {
        return __awaiter(this, void 0, void 0, function () {
            var bool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('CLick checkout button');
                        return [4 /*yield*/, this.itemList.first().waitFor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductLocator(productName).isVisible()];
                    case 2:
                        bool = _a.sent();
                        return [4 /*yield*/, this.expect(bool).toBeTruthy()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.checkoutButton.click()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //In getProductLocator() we simple return the locaotor after attaching productname
    CheckoutPage.prototype.getProductLocator = function (productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    };
    return CheckoutPage;
}());
