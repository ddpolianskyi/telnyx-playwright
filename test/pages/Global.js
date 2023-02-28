const { expect } = require('@playwright/test');

exports.Global = class Global {
    /**
        * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page
        this.cookiesAcceptButton = page.locator('div#__next > div > div div > div:nth-child(1) > button')
        this.talkToAnExpertButton = page.locator('header li:nth-child(1) > div > a')
        this.signUpButton = page.locator('header li:nth-child(2) > div > a')
        this.supportCenterButton = page.locator('header div > a:nth-child(3)')
        this.logInButton = page.locator('header div > a:nth-child(4)')
        this.productsButton = page.locator('header ul > li:nth-child(1) > span')
        this.resourcesButton = page.locator('header ul > li:nth-child(6) > span')
        this.companyButton = page.locator('header ul > li:nth-child(8) > span')
        this.pricingButton = page.locator('header ul > li:nth-child(10) > span')
    }

    productsItem(url){ return this.page.locator(`header ul > li:nth-child(1) a[href="${url}"]`) }
    resourcesItem(url){ return this.page.locator(`header ul > li:nth-child(6) a[href="${url}"]`) }
    companyItem(url){ return this.page.locator(`header ul > li:nth-child(8) a[href="${url}"]`) }
    pricingItem(url){ return this.page.locator(`header ul > li:nth-child(10) a[href="${url}"]`) }

    async goto(link){
        await this.page.goto(link)
    }
    async cookiesAcceptButtonClick(){
        await this.cookiesAcceptButton.click()
    }
    async cookiesAcceptCheck(){
        await expect(this.cookiesAcceptButton).not.toBeDisplayed()
    }
    async signUpButtonClick(){
        await this.signUpButton.click()
    }
    async talkToAnExpertButtonClick(){
        await this.talkToAnExpertButton.click()
    }
    async supportCenterButtonClick(){
        await this.supportCenterButton.click()
    }
    async logInButtonClick(){
        await this.logInButton.click()
    }
    async productsButtonHover(){ await this.productsButton.hover() }
    async productsItemClick(url){ await this.productsItem(url).click() }
    async resourcesButtonHover(){ await this.resourcesButton.hover() }
    async resourcesItemClick(url){ await this.resourcesItem(url).click() }
    async companyButtonHover(){ await this.companyButton.hover() }
    async companyItemClick(url){ await this.companyItem(url).click() }
    async pricingButtonHover(){ await this.pricingButton.hover() }
    async pricingItemClick(url){ await this.pricingItem(url).click() }
}