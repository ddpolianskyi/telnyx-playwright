const { expect } = require('@playwright/test');

exports.Blog = class Blog {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.searchInput = page.locator('input#search')
        this.searchResults = page.locator('div#articles > div:nth-child(2) > a:nth-child(1)')
    }

    async search(text){
        await this.searchInput.fill(text)
        await this.page.keyboard.press('Enter')
    }
    async searchCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await expect(this.searchResults).toBeVisible()
    }
    async searchEmptyCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await expect(this.searchResults).not.toBeVisible()
    }
}