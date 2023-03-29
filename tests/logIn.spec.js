const { test } = require('@playwright/test')
const { LoginPage } = require('./pages/Login.page')

test.describe('Login', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://portal.telnyx.com')
	})
	test('Login form should be valid', async ({ page }) => {
		const loginPage = new LoginPage(page)
		await loginPage.fillTheLogInFormWithValidCredentials()
		await loginPage.logInFormValidation()
	})
	test('Login form should be invalid due to invalid credentials', async ({ page }) => {
		const loginPage = new LoginPage(page)
		await loginPage.fillTheLogInFormWithInvalidCredentials()
		await loginPage.logInFormInvalidation()
	})
})