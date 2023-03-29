const { expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const
    emailInput = 'form input[name="email"]',
    emailError = 'form div#email_message',
    fullNameInput = 'form input[name="full_name"]',
    passwordInput = 'form input[name="password"]',
    passwordError = 'form > div > div:nth-child(2) > div:nth-child(2)',
    promoCodeButton = 'form > a',
    promoCodeInput = 'form input[name="promo_code"]',
    termsAndConditionsCheckbox = 'form input[name="terms_and_conditions"]',
    receiveEmailsCheckbox = 'form input[name="subscription_opt_in"]',
    submitButton = 'form[aria-label="signup-form"] > button[type="submit"]'

const
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    fullName = faker.name.fullName(),
    validEmail = faker.internet.email(),
    invalidEmail = faker.internet.email(firstName, lastName, 'email'),
    validPassword = faker.internet.password(20, false, /\w/, '123_'),
    invalidPassword = faker.internet.password(12, true),
    promoCode = faker.random.alphaNumeric(8)

exports.SignUpPage = class SignUpPage {
    constructor(page){
        this.page = page
    }
    async fillTheSignUpFormWithValidCredentials(){
        await this.page.locator(emailInput).fill(validEmail)
        await this.page.locator(fullNameInput).fill(fullName)
        await this.page.locator(passwordInput).fill(validPassword)
        await this.page.locator(promoCodeButton).click()
        await this.page.locator(promoCodeInput).fill(promoCode)
        await this.page.locator(submitButton).click()
        await this.page.locator(termsAndConditionsCheckbox).click()
        await this.page.locator(receiveEmailsCheckbox).click()
    }
    async fillTheSignUpFormWithInvalidCredentials(){
        await this.page.locator(emailInput).fill(invalidEmail)
        await this.page.locator(fullNameInput).fill(fullName)
        await this.page.locator(passwordInput).fill(invalidPassword)
        await this.page.locator(promoCodeButton).click()
        await this.page.locator(promoCodeInput).fill(promoCode)
        await this.page.locator(submitButton).click()
        await this.page.locator(termsAndConditionsCheckbox).click()
        await this.page.locator(receiveEmailsCheckbox).click()
    }
    async signUpFormValidation(){
        await expect(this.page.locator(emailError)).not.toBeVisible()
        await expect(this.page.locator(passwordError)).not.toBeVisible()
    }
    async signUpFormInvalidation(){
        await expect(this.page.locator(emailError)).toBeVisible()
        await expect(this.page.locator(passwordError)).toBeVisible()
    }
}