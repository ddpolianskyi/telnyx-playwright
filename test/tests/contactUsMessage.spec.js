const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { ContactUs } = require('../pages/ContactUs')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Contact us message', async () => {
	test('Should send Contact us message', async ({ page }) => {
		const global = new Global(page)
		const contactUs = new ContactUs(page)
		await global.talkToAnExpertButtonClick()
        await contactUs.fillTheContactUsFormWithValidCredentials()
		await contactUs.contactUsFormWithValidCredentialsCheck()
	})
    test('Should not send Contact us message due to invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const contactUs = new ContactUs(page)
		await global.talkToAnExpertButtonClick()
        await contactUs.fillTheContactUsFormWithInvalidCredentials()
		await contactUs.contactUsFormWithInvalidCredentialsCheck()
	})
})