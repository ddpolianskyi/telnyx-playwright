const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.LogIn = class LogIn {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.emailInput = page.locator('form div > label > div > div > input[name="email"]')
        this.passwordInput = page.locator('form input[name="password"]')
        this.rememberMeCheckbox = page.locator('form span > svg')
        this.submitButton = page.locator('form[aria-label="loginForm"] > button[type="submit"]')
        this.emailErrorMessage = page.locator('form label > div > div:nth-child(2)')
    }

    async fillTheLogInFormWithValidCredentials(){
        await this.emailInput.fill(fixtures.valid_email)
        await this.passwordInput.fill(fixtures.valid_password)
        await this.rememberMeCheckbox.click()
        await this.submitButton.click()
    }
    async fillTheLogInFormWithInvalidCredentials(){
        await this.emailInput.fill(fixtures.invalid_email)
        await this.passwordInput.fill(fixtures.invalid_password)
        await this.rememberMeCheckbox.click()
        await this.submitButton.click()
    }
    async logInFormWithValidCredentialsCheck(){
        await expect(this.emailErrorMessage).not.toBeVisible()
    }
    async logInFormWithInvalidCredentialsCheck(){
        await expect(this.emailErrorMessage).toBeVisible()
    }
}