const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Resources_SavingsCalculator } = require('../pages/Resources_SavingsCalculator')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Savings calculator', async () => {
	test('Should show calculated user savings', async ({ page }) => {
		const global = new Global(page)
		const resources_SavingsCalculator = new Resources_SavingsCalculator(page)
		await global.resourcesButtonHover()
        await global.resourcesItemClick('/twilio-pricing-calculator')
		await resources_SavingsCalculator.calculateUserSavings()
		await resources_SavingsCalculator.calculateUserSavingsCheck()
	})
})