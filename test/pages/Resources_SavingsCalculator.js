const { expect } = require('@playwright/test');

exports.Resources_SavingsCalculator = class Resources_SavingsCalculator {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.submitButton = page.locator('main > div > div > div > div:nth-child(4) button')
        this.localNumbersInput = page.locator('input#local-numbers')
        this.tollFreeNumbersInput = page.locator('input#toll-free-numbers')
        this.savingsResult = page.locator('main > div > div > div > div:nth-child(3) > div:nth-child(2) > h2')
    }
    productSelect(num){ return this.page.locator(`main > div > div > div > div:nth-child(3) > div > div:nth-child(${num})`) }

    async calculateUserSavings(){
        await this.productSelect(1).click()
        await this.submitButton.click()
        await this.localNumbersInput.fill('500')
        await this.tollFreeNumbersInput.fill('500')
        await this.submitButton.click()
    }
    async calculateUserSavingsCheck(){
        await expect(this.savingsResult).toBeVisible()
    }
}