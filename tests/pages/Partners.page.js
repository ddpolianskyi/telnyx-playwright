const { expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const
    firstNameInput = 'form input[name="FirstName"]',
    lastNameInput = 'form input[name="LastName"]',
    companyInput = 'form input[name="Company"]',
    emailInput = 'form input[name="Email"]',
    emailError = 'form input[name="Email"] ~ div.mktoError',
    phoneNumberExtensionSelect = 'form select[name="Phone_Number_Extension__c"]',
    phoneNumberInput = 'form input[name="Phone_Number_Base__c"]',
    partnerTypeSelect = 'form select[name="Partner_Type__c"]',
    additionalInformationInput = 'form textarea[name="Form_Additional_Information__c"]',
    receiveEmailsCheckbox = 'form input[name="Subscription_Opt_In__c"]',
    submitButton = 'form button[type="submit"]'

const 
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    companyName = faker.company.bs(),
    validEmail = faker.internet.email(),
    invalidEmail = faker.internet.email(firstName, lastName, 'email'),
    phoneNumber = faker.phone.number('(###)-###-###')

exports.PartnersPage = class PartnersPage {
    constructor(page){
        this.page = page
    }
    async fillThePartnershipFormWithValidCredentials(){
        await this.page.locator(firstNameInput).waitFor(15 * 1000)
        await this.page.locator(firstNameInput).fill(firstName)
        await this.page.locator(lastNameInput).fill(lastName)
        await this.page.locator(companyInput).fill(companyName)
        await this.page.locator(emailInput).fill(validEmail)
        await this.page.locator(phoneNumberExtensionSelect).selectOption({ label: 'United States (+1)' })
        await this.page.locator(phoneNumberInput).fill(phoneNumber)
        await this.page.locator(partnerTypeSelect).selectOption({ value: 'Technology' })
        await this.page.locator(additionalInformationInput).fill('Test additional information.')
        await this.page.locator(receiveEmailsCheckbox).click()
        // await this.page.locator(submitButton).click()
    }
    async fillThePartnershipFormWithInvalidCredentials(){
        await this.page.locator(firstNameInput).waitFor(15 * 1000)
        await this.page.locator(firstNameInput).fill(firstName)
        await this.page.locator(lastNameInput).fill(lastName)
        await this.page.locator(companyInput).fill(companyName)
        await this.page.locator(emailInput).fill(invalidEmail)
        await this.page.locator(phoneNumberExtensionSelect).selectOption({ label: 'United States (+1)' })
        await this.page.locator(phoneNumberInput).fill(phoneNumber)
        await this.page.locator(partnerTypeSelect).selectOption({ value: 'Technology' })
        await this.page.locator(additionalInformationInput).fill('Test additional information.')
        await this.page.locator(receiveEmailsCheckbox).click()
        await this.page.locator(submitButton).click()
    }
    async partnershipFormValidation(){
        await expect(this.page.locator(emailError)).not.toBeVisible()
    }
    async partnershipFormInvalidation(){
        await expect(this.page.locator(emailError)).toBeVisible()
    }
}