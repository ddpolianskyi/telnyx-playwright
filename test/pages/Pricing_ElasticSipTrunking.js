const { expect } = require('@playwright/test');
const fixtures = require('../fixtures/fixtures.json')

exports.Pricing_ElasticSipTrunking = class Pricing_ElasticSipTrunking {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.countryInput = page.locator('main button[aria-haspopup="listbox"]')
        this.pricingDownloadSection = page.locator('div#pricing_download_form')
        this.pricingDownloadForm = page.locator('div#pricing_download_form')
        this.pricingDownloadFirstNameInput = page.locator('div#pricing_download_form input[name="FirstName"]')
        this.pricingDownloadLastNameInput = page.locator('div#pricing_download_form input[name="LastName"]')
        this.pricingDownloadEmailInput = page.locator('div#pricing_download_form input[name="Email"]')
        this.pricingDownloadReceiveEmailsCheckboxLabel = page.locator('div#pricing_download_form input[name="Subscription_Opt_In__c"] ~ label')
        this.pricingDownloadSubmitButton = page.locator('div#pricing_download_form button[type="submit"]')
        this.pricingDownloadErrorMessages = page.locator('div#pricing_download_form div[aria-live="assertive"]')
    }
    countryItemParent(country){ return this.page.locator(`//main//button[@aria-haspopup="listbox"]/following-sibling::ul//a[text()="${country}"]/parent::li`) }
    countryItem(country){ return this.page.locator(`//main//button[@aria-haspopup="listbox"]/following-sibling::ul//a[text()="${country}"]`) }

    async selectCountry(country){
        await this.countryInput.click()
        await this.countryItem(country).click()
    }
    async pricingsForCountryCheck(country, countryLink){
        await expect(this.page).toHaveURL(new RegExp(countryLink + '$'))
        await expect(this.countryItemParent(country)).toHaveAttribute('aria-selected', 'true')
    }
    async fillTheDownloadingCSVFormWithValidCredentials(){
        await this.pricingDownloadSection.scrollIntoViewIfNeeded()
        await this.pricingDownloadFirstNameInput.fill(fixtures.first_name)
        await this.pricingDownloadLastNameInput.fill(fixtures.last_name)
        await this.pricingDownloadEmailInput.fill(fixtures.valid_email)
        await this.pricingDownloadReceiveEmailsCheckboxLabel.click()
        await this.pricingDownloadSubmitButton.click()
    }
    async fillTheDownloadingCSVFormWithInvalidCredentials(){
        await this.pricingDownloadSection.scrollIntoViewIfNeeded()
        await this.pricingDownloadFirstNameInput.fill(fixtures.first_name)
        await this.pricingDownloadLastNameInput.fill(fixtures.last_name)
        await this.pricingDownloadEmailInput.fill(fixtures.invalid_email)
        await this.pricingDownloadReceiveEmailsCheckboxLabel.click()
        await this.pricingDownloadReceiveEmailsCheckboxLabel.click()
        await this.pricingDownloadSubmitButton.click()
    }
    async downloadingCSVFormWithValidCredentialsCheck(){
        await expect(this.pricingDownloadErrorMessages).not.toBeVisible()
    }
    async downloadingCSVFormWithInvalidCredentialsCheck(){
        await expect(this.pricingDownloadErrorMessages).toBeVisible()
    }
}