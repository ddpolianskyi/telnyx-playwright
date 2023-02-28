const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Pricing_ElasticSipTrunking } = require('../pages/Pricing_ElasticSipTrunking')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Downloading prices CSV', async () => {
	test('Should download CSV of prices', async ({ page }) => {
		const global = new Global(page)
		const pricing_ElasticSipTrunking = new Pricing_ElasticSipTrunking(page)
        await global.pricingButtonHover()
        await global.pricingItemClick('/pricing/elastic-sip')
        await pricing_ElasticSipTrunking.fillTheDownloadingCSVFormWithValidCredentials()
        await pricing_ElasticSipTrunking.downloadingCSVFormWithValidCredentialsCheck()
	})
    test('Should not download CSV of prices due to invalid credentials', async ({ page }) => {
		const global = new Global(page)
		const pricing_ElasticSipTrunking = new Pricing_ElasticSipTrunking(page)
        await global.pricingButtonHover()
        await global.pricingItemClick('/pricing/elastic-sip')
        await pricing_ElasticSipTrunking.fillTheDownloadingCSVFormWithInvalidCredentials()
        await pricing_ElasticSipTrunking.downloadingCSVFormWithInvalidCredentialsCheck()
	})
})