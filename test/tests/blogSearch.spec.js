const { test } = require('@playwright/test');
const { Global } = require('../pages/Global')
const { Blog } = require('../pages/Blog')

test.beforeEach(async ({ page }) => {
	const global = new Global(page)
	await page.goto('/')
	await global.cookiesAcceptButtonClick()
})

test.describe('Blog search', async () => {
	test('Should show search results for "programming"', async ({ page }) => {
		const global = new Global(page)
		const blog = new Blog(page)
        await global.resourcesButtonHover()
        await global.resourcesItemClick('/resources')
        await blog.search('programming')
        await blog.searchCheck('programming')
	})
    test('Should show empty search results for "blablabla"', async ({ page }) => {
		const global = new Global(page)
		const blog = new Blog(page)
        await global.resourcesButtonHover()
        await global.resourcesItemClick('/resources')
        await blog.search('blablabla')
        await blog.searchEmptyCheck('blablabla')
	})
})