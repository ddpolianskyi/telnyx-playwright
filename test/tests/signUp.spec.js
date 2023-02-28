const { test } = require('@playwright/test');

const { Global } = require('../pages/Global')
const { SignUp } = require('../pages/SignUp')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})
test.describe('Sign up', async () => {
	test('Should sign up', async ({ page }) => {
		const global = new Global(page)
		const signUp = new SignUp(page)
        await global.signUpButtonClick()
        await signUp.fillTheSignUpFormWithValidCredentials()
        await signUp.signUpFormWithValidCredentialsCheck()
	})
	test('Should not sign up due to invalid credentials', async ({ page }) => {
        const global = new Global(page)
		const signUp = new SignUp(page)
        await global.signUpButtonClick()
        await signUp.fillTheSignUpFormWithInvalidCredentials()
        await signUp.signUpFormWithInvalidCredentialsCheck()
	})
})