const
    acceptCookiesButton = 'body > div > div > button'

exports.HomePage = class HomePage {
    constructor(page){
        this.page = page
    }
    async acceptCookiesButtonClick(){
        await this.page.locator(acceptCookiesButton).click()
    }
}