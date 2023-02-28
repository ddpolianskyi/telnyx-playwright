const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Products_NumberLookup } = require('../pages/Products_NumberLookup')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Look up number', async () => {
	test('Should show phone number information correctly', async ({ page }) => {
		const global = new Global(page)
		const products_NumberLookup = new Products_NumberLookup(page)
		await global.productsButtonHover()
        await global.productsItemClick('/number-lookup')
		await products_NumberLookup.fillTheNumberLookupFormWithValidCredentials()
		await products_NumberLookup.numberLookupFormWithValidCredentialsCheck()
	})
    test('Should show phone number information incorrectly due to invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const products_NumberLookup = new Products_NumberLookup(page)
		await global.productsButtonHover()
        await global.productsItemClick('/number-lookup')
		await products_NumberLookup.fillTheNumberLookupFormWithInvalidCredentials()
		await products_NumberLookup.numberLookupFormWithInvalidCredentialsCheck()
	})
})