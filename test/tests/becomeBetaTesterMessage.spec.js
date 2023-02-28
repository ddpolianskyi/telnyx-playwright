const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Integrations } = require('../pages/Integrations')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Become a beta tester message', async () => {
	test('Should send Become a beta tester message', async ({ page }) => {
		const global = new Global(page)
		const integrations = new Integrations(page)
		await global.companyButtonHover()
        await global.companyItemClick('/integrations')
        await integrations.fillTheBecomeBetaTesterFormWithValidCredentials()
        await integrations.becomeBetaTesterFormWithValidCredentialsCheck()
	})
    test('Should not send Become a beta tester message due to invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const integrations = new Integrations(page)
		await global.companyButtonHover()
        await global.companyItemClick('/integrations')
        await integrations.fillTheBecomeBetaTesterFormWithInvalidCredentials()
        await integrations.becomeBetaTesterFormWithInvalidCredentialsCheck()
	})
})