const { expect } = require('@playwright/test')

const
    searchInput = 'form input.search__input',
    searchResults = 'section.section > div'

exports.SupportCenterPage = class SupportCenterPage {
    constructor(page){
        this.page = page
    }
    async search(text){
        await this.page.locator(searchInput).fill(text)
        await this.page.keyboard.press('Enter')
    }
    async searchCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await this.page.locator(searchResults + ':nth-child(2)').waitFor(15 * 1000)
        await expect(await this.page.locator(searchResults).count()).toBeGreaterThan(1)
    }
    async emptySearchCheck(text){
        await expect(this.page).toHaveURL(new RegExp(text + '$'))
        await this.page.locator(searchResults + ':nth-child(1)').waitFor(15 * 1000)
        await expect(await this.page.locator(searchResults).count()).toBe(1)
    }
}