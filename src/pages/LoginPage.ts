import { ThenableWebDriver, By } from 'selenium-webdriver';
import * as until from 'selenium-webdriver/lib/until'
import { DashboardPage } from './DashboardPage';
import { ICPPage } from './ICPPage';
export class LoginPage extends ICPPage {
    signInForCSSLocator = By.css('.auth-content');
    userNameFieldIdLocator = By.id('#okta-signin-username'); 
    usereNameFieldContinueIdLocator = By.id('#okta-signin-submit');
    passwordFieldCSSLocator = By.css(".password-with-toggle");
    passwordVerifyCSSLocator = By.css('.button.button-primary');

    

    constructor(driver:ThenableWebDriver) {
        super(driver);
        console.log("begining of the constructor");
        (async ()=> {
            console.log("before wait")
            await driver.wait(until.elementLocated(this.signInForCSSLocator),this.pageElementTimeOut,"Could not find Sign In form on the page");
            console.log("after wait");
        })();
        console.log("end of constructor");
    }

    async login(username: string, password: string) : Promise<DashboardPage> {
        let uf = await this.driver.findElement(this.userNameFieldIdLocator);
        let contButton = await this.driver.findElement(this.usereNameFieldContinueIdLocator)
        await uf.sendKeys(username);
        await contButton.click();
        await this.driver.wait(until.elementLocated(this.passwordFieldCSSLocator),this.pageElementTimeOut,"Password field does not appears on login screen");
        let passwordField = this.driver.findElement(this.passwordFieldCSSLocator);
        let verifyField = this.driver.findElement(this.passwordVerifyCSSLocator);
        await passwordField.sendKeys(password);
        await verifyField.click();
        return new DashboardPage(this.driver);
    }

}