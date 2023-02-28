const { test } = require('@playwright/test');

const { Global } = require('../pages/Global')
const { LogIn } = require('../pages/LogIn')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})
test.describe('Log in', async () => {
	test('Log in with valid credentials', async ({ page }) => {
		const global = new Global(page)
		const logIn = new LogIn(page)
		await global.logInButtonClick()
		await logIn.fillTheLogInFormWithValidCredentials()
		await logIn.logInFormWithValidCredentialsCheck()
	})
	test('Log in with invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const logIn = new LogIn(page)
		await global.logInButtonClick()
		await logIn.fillTheLogInFormWithInvalidCredentials()
		await logIn.logInFormWithInvalidCredentialsCheck()
	})
})