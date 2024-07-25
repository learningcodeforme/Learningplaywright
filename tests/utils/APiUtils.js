class APiUntils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token;
        console.log("token - " + token)
        return token;
    }

    async createOrder(orderPayLoad) {
        // decalre javascript object called response 
        let response = {};
        // create the properties of response object response.token and assign getToken()
        //from getToken() method
        response.token = await this.getToken()

        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayLoad,
            headers: {
                // pass response.token( which is the property of javacript object repsonse)
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        //create propery for repsonse object called orderID 
        // response.orderId
        response.orderId = orderId
        //return the response which have two value OrderID and token
        return response;
    }

}
export default APiUntils

