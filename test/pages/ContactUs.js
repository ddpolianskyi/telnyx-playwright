const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.ContactUs = class ContactUs {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.reasonForContactInput = page.locator('form select[name="Reason_for_Contact__c"]')
        this.firstNameInput = page.locator('form input[name="FirstName"]')
        this.lastNameInput = page.locator('form input[name="LastName"]')
        this.emailInput = page.locator('form input[name="Email"]')
        this.countryInput = page.locator('form select[name="Phone_Number_Extension__c"]')
        this.phoneNumberInput = page.locator('form input[name="Phone_Number_Base__c"]')
        this.websiteInput = page.locator('form input[name="Website"]')
        this.additionalInformationInput = page.locator('form textarea[name="Form_Additional_Information__c"]')
        this.receiveEmailsCheckbox = page.locator('form input[name="Subscription_Opt_In__c"]')
        this.submitButton = page.locator('form button[type="submit"]')
    }

    async fillTheContactUsFormWithValidCredentials(){
        await this.reasonForContactInput.click()
        await this.reasonForContactInput.selectOption('Support')
        await this.firstNameInput.fill(fixtures.first_name)
        await this.lastNameInput.fill(fixtures.last_name)
        await this.emailInput.fill(fixtures.valid_email)
        await this.countryInput.click()
        await this.countryInput.selectOption('+48')
        await this.phoneNumberInput.fill(fixtures.phone_number)
        await this.websiteInput.fill(fixtures.website_url)
        await this.additionalInformationInput.fill('test')
        await this.receiveEmailsCheckbox.click()
        // await this.submitButton.click()
    }
    async fillTheContactUsFormWithInvalidCredentials(){
        await this.reasonForContactInput.click()
        await this.reasonForContactInput.selectOption('')
        await this.firstNameInput.fill(fixtures.first_name)
        await this.lastNameInput.fill(fixtures.last_name)
        await this.emailInput.fill(fixtures.invalid_email)
        await this.countryInput.click()
        await this.countryInput.selectOption('+48')
        await this.phoneNumberInput.fill(fixtures.phone_number)
        await this.websiteInput.fill(fixtures.website_url)
        await this.additionalInformationInput.fill('test')
        await this.receiveEmailsCheckbox.click()
        await this.submitButton.click()
    }
    async contactUsFormWithValidCredentialsCheck(){
        await expect(this.reasonForContactInput).toHaveAttribute('aria-invalid', 'false')
        await expect(this.emailInput).toHaveAttribute('aria-invalid', 'false')
    }
    async contactUsFormWithInvalidCredentialsCheck(){
        await expect(this.reasonForContactInput).toHaveAttribute('aria-invalid', 'true')
        await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true')
    }
}