import { ThenableWebDriver } from 'selenium-webdriver';
import { Config } from '../config/Config';
export class ICPPage {
    driver:ThenableWebDriver;

    footerCSSLocator = '.footer';
    footerRBCCSSLocator = '.footer .container .row > div:nth-child(1) > div span';
    footerPoliciesCSSLocator = '.footer .container .row > div:nth-child(1) > ul';
    footerPrivacyCSSLocator = '.footer .container .row > div:nth-child(1) > ul>li:nth-child(1)>a';
    footerLegalCSSLocator = '.footer .container .row > div:nth-child(2) > ul>li:nth-child(2)>a';
    footerAccessCSSLocator = '.footer .container .row > div:nth-child(3) > ul>li:nth-child(3)>a';
    footerTermsCSSLocator = '.footer .container .row > div:nth-child(4) > ul>li:nth-child(1)>a';
    gamIconCSSLocator = '.navbar-brand img'

    pageElementTimeOut = Config.getConfig().getOptions().timeOut;
    configuration = Config.getConfig().getOptions();
    constructor(driver: ThenableWebDriver) {
        this.driver = driver;
    }


}