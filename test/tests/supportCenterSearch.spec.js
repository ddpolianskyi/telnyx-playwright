const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { SupportCenter } = require('../pages/SupportCenter')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Support center search', async () => {
	test('Should show search results for "programming"', async ({ page }) => {
		const global = new Global(page)
		const supportCenter = new SupportCenter(page)
        await global.supportCenterButtonClick()
        await supportCenter.search('programming')
        await supportCenter.searchCheck('programming')
	})
    test('Should show empty search for "blablabla"', async ({ page }) => {
        const global = new Global(page)
		const supportCenter = new SupportCenter(page)
        await global.supportCenterButtonClick()
        await supportCenter.search('blablabla')
        await supportCenter.searchEmptyCheck('blablabla')
	})
})