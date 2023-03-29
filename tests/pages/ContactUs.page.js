const { expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const
    reasonForContactSelect = 'form select[name="Reason_for_Contact__c"]',
    firstNameInput = 'form input[name="FirstName"]',
    lastNameInput = 'form input[name="LastName"]',
    emailInput = 'form input[name="Email"]',
    emailError = 'form input[name="Email"] ~ div.mktoError',
    countrySelect = 'form select[name="Phone_Number_Extension__c"]',
    phoneNumberInput = 'form input[name="Phone_Number_Base__c"]',
    websiteInput = 'form input[name="Website"]',
    additionalInformationInput = 'form textarea[name="Form_Additional_Information__c"]',
    howDidYouHearAboutTelnyxInput = 'form input[name="How_did_you_hear_about_Telnyx_Open__c"]',
    receiveEmailsCheckbox = 'form input[name="Subscription_Opt_In__c"]',
    submitButton = 'form button[type="submit"]'

const
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    validEmail = faker.internet.email(firstName, lastName),
    invalidEmail = faker.internet.email(firstName, lastName, 'email'),
    phoneNumber = faker.phone.number('(###)-###-###'),
    companyName = faker.company.bs()

exports.ContactUsPage = class ContactUsPage {
    constructor(page){
        this.page = page
    }
    async fillTheContactUsMessageFormWithValidCredentials(){
        await this.page.locator(reasonForContactSelect).selectOption({ value: 'Support' })
        await this.page.locator(firstNameInput).fill(firstName)
        await this.page.locator(lastNameInput).fill(lastName)
        await this.page.locator(emailInput).fill(validEmail)
        await this.page.locator(countrySelect).selectOption({ label: 'United States (+1)' })
        await this.page.locator(phoneNumberInput).fill(phoneNumber)
        await this.page.locator(websiteInput).fill(companyName)
        await this.page.locator(additionalInformationInput).fill('Testing')
        await this.page.locator(howDidYouHearAboutTelnyxInput).fill('Testing')
        await this.page.locator(receiveEmailsCheckbox).click()
        // await this.page.locator(submitButton).click()
    }
    async fillTheContactUsMessageFormWithInvalidCredentials(){
        await this.page.locator(reasonForContactSelect).selectOption({ value: 'Support' })
        await this.page.locator(firstNameInput).fill(firstName)
        await this.page.locator(lastNameInput).fill(lastName)
        await this.page.locator(emailInput).fill(invalidEmail)
        await this.page.locator(countrySelect).selectOption({ label: 'United States (+1)' })
        await this.page.locator(phoneNumberInput).fill(phoneNumber)
        await this.page.locator(websiteInput).fill(companyName)
        await this.page.locator(additionalInformationInput).fill('Testing')
        await this.page.locator(howDidYouHearAboutTelnyxInput).fill('Testing')
        await this.page.locator(receiveEmailsCheckbox).click()
        await this.page.locator(submitButton).click()
    }
    async contactUsMessageFormValidation(){
        await expect(this.page.locator(emailError)).not.toBeVisible()
    }
    async contactUsMessageFormInvalidation(){
        await expect(this.page.locator(emailError)).toBeVisible()
    }
}