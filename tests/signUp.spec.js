const { test } = require('@playwright/test')
const { HomePage } = require('./pages/Home.page')
const { SignUpPage } = require('./pages/SignUp.page')

test.describe('Sign up', () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page)
		await page.goto('/sign-up')
		await homePage.acceptCookiesButtonClick()
	})
	test('Sign up form should be valid', async ({ page }) => {
		const signUpPage = new SignUpPage(page)
		await signUpPage.fillTheSignUpFormWithValidCredentials()
		await signUpPage.signUpFormValidation()
	})
	test('Sign up form should be invalid due to invalid credentials', async ({ page }) => {
		const signUpPage = new SignUpPage(page)
		await signUpPage.fillTheSignUpFormWithInvalidCredentials()
		await signUpPage.signUpFormInvalidation()
	})
})