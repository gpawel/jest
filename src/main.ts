
import { Config } from './config/Config'; 
import { WebDriverFactory } from './webdriver/WebDrivereFactory';
import { Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver';
let con = Config.getConfig();
con.showOptions();
//console.log("chrome path: ",con.getOptions().chrome);
//console.log("base url: ",con.getOptions().baseUrl);
let driver: ThenableWebDriver = WebDriverFactory.createLocalWebDriver("chrome");

let driver1: ThenableWebDriver = WebDriverFactory.createRemoteWebDriver(con.getOptions().hub,"chrome");
(async function() {
    await driver.sleep(5000);
    driver.quit();
    driver1.quit();
})();





//con.showOptions();
//let opt = con.getOptions();
//console.log(opt);
//console.log(opt.browser);


//console.log("time:", con.timestmp);

//setTimeout(() => {  let con1 = Context.getContext(); console.log("time:", con1.timestmp);; }, 5000);