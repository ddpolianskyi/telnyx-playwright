const { test } = require('@playwright/test')
const { HomePage } = require('./pages/Home.page')
const { PartnersPage } = require('./pages/Partners.page')

test.describe('Partnership message', () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page)
		await page.goto('/partnerships')
		await homePage.acceptCookiesButtonClick()
	})
	test('Partnership message form should be valid', async ({ page }) => {
		const partnersPage = new PartnersPage(page)
		await partnersPage.fillThePartnershipFormWithValidCredentials()
		await partnersPage.partnershipFormValidation()
	})
	test('Partnership message form should be invalid due to invalid credentials', async ({ page }) => {
		const partnersPage = new PartnersPage(page)
		await partnersPage.fillThePartnershipFormWithInvalidCredentials()
		await partnersPage.partnershipFormInvalidation()
	})
})