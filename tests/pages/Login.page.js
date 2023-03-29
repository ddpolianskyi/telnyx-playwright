const { expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const
    emailInput = 'form > div input[name="email"]',
    emailError = 'form label > div > div:nth-child(2)',
    passwordInput = 'form input[name="password"]',
    forgotYourPasswordButton = 'form a[href*="/password-reset"]',
    rememberMyEmailCheckbox = 'form input[name="remember_me"]',
    rememberMyEmailCheckboxLabel = 'form div > div > div > label',
    submitButton = 'form[aria-label="loginForm"] > button'

const
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    validEmail = faker.internet.email(),
    invalidEmail = faker.internet.email(firstName, lastName, 'email'),
    password = faker.internet.password(12)

exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page
    }
    async fillTheLogInFormWithValidCredentials(){
        await this.page.locator(emailInput).fill(validEmail)
        await this.page.locator(passwordInput).fill(password)
        await this.page.locator(rememberMyEmailCheckboxLabel).click()
        await this.page.locator(submitButton).click()
    }
    async fillTheLogInFormWithInvalidCredentials(){
        await this.page.locator(emailInput).fill(invalidEmail)
        await this.page.locator(passwordInput).fill(password)
        await this.page.locator(rememberMyEmailCheckboxLabel).click()
        await this.page.locator(submitButton).click()
    }
    async logInFormValidation(){
        await expect(this.page.locator(emailError)).not.toBeVisible()
    }
    async logInFormInvalidation(){
        await expect(this.page.locator(emailError)).toBeVisible()
    }
}