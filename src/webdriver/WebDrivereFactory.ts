import { Config } from '../config/Config';
import { Drivers } from './DriversEnum';
import { Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

let driver: ThenableWebDriver;
    
export class WebDriverFactory {
    static config = Config.getConfig().getOptions();
    static capabilities = Capabilities.chrome();

    private constructor() {

    }

    public static createRemoteWebDriver(hubUrl: string, browser: string): ThenableWebDriver {
        switch (browser.toLowerCase()) {
            case Drivers.chrome: {
                return this.createRemoteChromeDriver(hubUrl);
            }
            default: return this.createRemoteChromeDriver(hubUrl);
        }

    }

    public static createLocalWebDriver(browser: string): ThenableWebDriver {
        switch (browser.toLowerCase()) {
            case Drivers.chrome: {
                return this.createLocalChromeDriver();
            }
            default: return this.createLocalChromeDriver();
        }
    }

    private static createLocalChromeDriver(): ThenableWebDriver {
        chrome.setDefaultService(new chrome.ServiceBuilder(this.config.chrome).build());
        driver = new Builder().forBrowser('chrome').withCapabilities(this.capabilities).build();
        return driver;
    }

    private static createRemoteChromeDriver(hubUrl: string): ThenableWebDriver {
        driver = new Builder().usingServer(this.config.hub)
            .withCapabilities(this.capabilities)
            .build();

        return driver;
    }
}