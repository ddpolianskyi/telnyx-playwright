const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Pricing_ElasticSipTrunking } = require('../pages/Pricing_ElasticSipTrunking')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Changing pricing country', async () => {
	test('Should change pricings for country', async ({ page }) => {
		const global = new Global(page)
		const pricing_ElasticSipTrunking = new Pricing_ElasticSipTrunking(page)
        await global.pricingButtonHover()
        await global.pricingItemClick('/pricing/elastic-sip')
        await pricing_ElasticSipTrunking.selectCountry('Poland')
        await pricing_ElasticSipTrunking.pricingsForCountryCheck('Poland', 'pl')
	})
})