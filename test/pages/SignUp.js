const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.SignUp = class SignUp {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.emailInput = page.locator('form input#email')
        this.fullNameInput = page.locator('form input#full_name')
        this.passwordInput = page.locator('form input#password')
        this.termsAndConditionsCheckbox = page.locator('form > div:nth-child(3) > div:nth-child(1) > div > div > svg')
        this.receiveEmailsCheckbox = page.locator('form > div:nth-child(3) > div:nth-child(2) > div > svg')
        this.submitButton = page.locator('form button[type="submit"]')
    }

    async fillTheSignUpFormWithValidCredentials(){
        await this.emailInput.fill(fixtures.valid_email)
        await this.fullNameInput.fill(fixtures.full_name)
        await this.passwordInput.fill(fixtures.valid_password)
        await this.termsAndConditionsCheckbox.click()
        await this.receiveEmailsCheckbox.click()
        // await this.submitButton.click()
    }
    async fillTheSignUpFormWithInvalidCredentials(){
        await this.emailInput.fill(fixtures.invalid_email)
        await this.fullNameInput.fill(fixtures.full_name)
        await this.passwordInput.fill(fixtures.invalid_password)
        await this.termsAndConditionsCheckbox.click()
        await this.receiveEmailsCheckbox.click()
        await this.submitButton.click()
    }
    async signUpFormWithValidCredentialsCheck(){
        await expect(this.emailInput).not.toHaveAttribute('aria-invalid', 'true')
        await expect(this.passwordInput).not.toHaveAttribute('aria-invalid', 'true')
    }
    async signUpFormWithInvalidCredentialsCheck(){
        await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true')
        await expect(this.passwordInput).toHaveAttribute('aria-invalid', 'true')
    }
}