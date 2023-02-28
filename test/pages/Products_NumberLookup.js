const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.Products_NumberLookup = class Products_NumberLookup {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.countryInput = page.locator('form button[aria-haspopup="listbox"]')
        this.phoneNumberInput = page.locator('input#number-lookup-input')
        this.termsAndConditionsCheckbox = page.locator('input#numberLookup-termsCheckbox')
        this.submitButton = page.locator('main > div > div > div:nth-child(1) div > div > div > button')
        this.phoneNumberInformation = page.locator('div > section:nth-child(1)')
    }
    countryInputItem(name){ return this.page.locator(`//form//ul/li/div[text()="${name}"]`) }

    async fillTheNumberLookupFormWithValidCredentials(){
        await this.countryInput.click()
        await this.countryInputItem('Poland').click()
        await this.phoneNumberInput.fill(fixtures.phone_number)
        await this.termsAndConditionsCheckbox.click()
        await this.submitButton.click()
    }
    async fillTheNumberLookupFormWithInvalidCredentials(){
        await this.countryInput.click()
        await this.countryInputItem('Poland').click()
        await this.phoneNumberInput.fill('1')
        await this.termsAndConditionsCheckbox.click()
        await this.submitButton.click()
    }
    async numberLookupFormWithValidCredentialsCheck(){
        await expect(this.phoneNumberInformation).toBeVisible()
    }
    async numberLookupFormWithInvalidCredentialsCheck(){
        await expect(this.phoneNumberInformation).not.toBeVisible()
    }
}