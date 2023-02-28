const { test } = require('@playwright/test');

const { Global } = require('../pages/Global')
const { Partners } = require('../pages/Partners')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Partnership message', async () => {
	test('Should send Partnership message', async ({ page }) => {
		const global = new Global(page)
		const partners = new Partners(page)
		await global.companyButtonHover()
        await global.companyItemClick('/company/partnerships')
        await partners.fillThePartnershipFormWithValidCredentials()
        await partners.partnershipFormWithValidCredentialsCheck()
	})
    test('Should not send Partnership due to invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const partners = new Partners(page)
		await global.companyButtonHover()
        await global.companyItemClick('/company/partnerships')
        await partners.fillThePartnershipFormWithInvalidCredentials()
        await partners.partnershipFormWithInvalidCredentialsCheck()
	})
})