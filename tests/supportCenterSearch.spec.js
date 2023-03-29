const { test } = require('@playwright/test')
const { SupportCenterPage } = require('./pages/SupportCenter.page')

test.describe('Support Center search', () => {
    test.beforeEach(async ({ page }) => {
		await page.goto('https://support.telnyx.com')
	})
	test('Should search for results', async ({ page }) => {
        const supportCenterPage = new SupportCenterPage(page)
		await supportCenterPage.search('programming')
		await supportCenterPage.searchCheck('programming')
	})
	test('Should search for empty results', async ({ page }) => {
        const supportCenterPage = new SupportCenterPage(page)
		await supportCenterPage.search('blablabla')
		await supportCenterPage.emptySearchCheck('blablabla')
	})
})