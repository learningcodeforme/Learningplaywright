class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signIn = page.locator('#login')

    }

    async goToPage() {
        await this.page.goto('https://rahulshettyacademy.com/client');

    }

    async validLogin(username, password) {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle')

    }
}

export default LoginPage