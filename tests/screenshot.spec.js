import {test, expect} from '@playwright/test'

test('take Screenshot in playwright',async({page}) => {

    //Go to the saucedemo website
    await page.goto('https://www.saucedemo.com/');

    await page.locator('.login_credentials_wrap-inner').screenshot({path:'./screenshots/element.png'});    
    
    //End timeout
    await page.waitForTimeout(4000);
});