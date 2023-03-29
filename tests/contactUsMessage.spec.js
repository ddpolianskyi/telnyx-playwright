const { test } = require('@playwright/test')
const { HomePage } = require('./pages/Home.page')
const { ContactUsPage } = require('./pages/ContactUs.page')

test.describe('Contact Us message', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await page.goto('/contact-us')
        await homePage.acceptCookiesButtonClick()
    })
    test('Contact Us message form should be valid', async ({ page }) => {
        const contactUsPage = new ContactUsPage(page)
        await contactUsPage.fillTheContactUsMessageFormWithValidCredentials()
        await contactUsPage.contactUsMessageFormValidation()
    })
    test('Contact Us message form should be invalid due to invalid credentials', async ({ page }) => {
        const contactUsPage = new ContactUsPage(page)
        await contactUsPage.fillTheContactUsMessageFormWithInvalidCredentials()
        await contactUsPage.contactUsMessageFormInvalidation()
    })
})