const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.Partners = class Partners {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.partnershipSection = page.locator('div#become-a-partner')
        this.partnershipForm = page.locator('div#become-a-partner form')
        this.firstNameInput = page.locator('form input#FirstName')
        this.lastNameInput = page.locator('form input#LastName')
        this.emailInput = page.locator('form input#Email')
        this.primaryUseCaseSelect = page.locator('form select#Use_Case_Form__c')
        this.additionalInformationInput = page.locator('form textarea#Form_Additional_Information__c')
        this.receiveEmailsCheckboxLabel = page.locator('form input#Subscription_Opt_In__c ~ label')
        this.submitButton = page.locator('form button[type="submit"]')
    }

    async fillThePartnershipFormWithValidCredentials(){
        await this.partnershipSection.scrollIntoViewIfNeeded()
        await this.firstNameInput.fill(fixtures.first_name)
        await this.lastNameInput.fill(fixtures.last_name)
        await this.emailInput.fill(fixtures.valid_email)
        await this.primaryUseCaseSelect.click()
        await this.primaryUseCaseSelect.selectOption('Other')
        await this.additionalInformationInput.fill('test')
        await this.receiveEmailsCheckboxLabel.click()
        // await this.submitButton.click()
    }
    async fillThePartnershipFormWithInvalidCredentials(){
        await this.partnershipSection.scrollIntoViewIfNeeded()
        await this.firstNameInput.fill(fixtures.first_name)
        await this.lastNameInput.fill(fixtures.last_name)
        await this.emailInput.fill(fixtures.invalid_email)
        await this.primaryUseCaseSelect.click()
        await this.primaryUseCaseSelect.selectOption('')
        await this.additionalInformationInput.fill('test')
        await this.receiveEmailsCheckboxLabel.click()
        // await this.submitButton.click()
    }
    async partnershipFormWithValidCredentialsCheck(){
        await expect(this.emailInput).toHaveAttribute('aria-invalid', 'false')
        await expect(this.primaryUseCaseSelect).toHaveAttribute('aria-invalid', 'false')
    }
    async partnershipFormWithInvalidCredentialsCheck(){
        await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true')
        await expect(this.primaryUseCaseSelect).toHaveAttribute('aria-invalid', 'true')
    }
}