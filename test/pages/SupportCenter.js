const { expect } = require('@playwright/test');

exports.SupportCenter = class SupportCenter {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.searchInput = page.locator('form input.search__input')
        this.searchResults = page.locator('section.section__search_results > div')
    }
    searchResultsItem(num){ return this.page.locator(`section.section__search_results > div:nth-child(${num})`) }

    async search(text){
        await this.searchInput.fill(text)
        await this.page.keyboard.press('Enter')
    }
    async searchCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await expect(this.searchResultsItem(2)).toBeVisible()
    }
    async searchEmptyCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await expect(this.searchResultsItem(2)).not.toBeVisible()
    }
}