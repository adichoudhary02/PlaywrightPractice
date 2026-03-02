import {test, expect} from '@playwright/test'

test('login page',async({page}) => {

    //Go to the saucedemo website
    await page.goto('https://www.saucedemo.com/');

    //Check for the title
    await expect(page).toHaveTitle('Swag Labs');

    //SwagLabs Text
    await expect(page.getByText('Swag Labs')).toBeVisible();
    //await expect(page.locator('.login_logo')).toBeVisible();
    // await expect(page.locator('//div[@class="Swag Labs"]'))

    //Login Form
    //await expect(page.getByRole('form')).toBeVisible();
    
    //UserName field
    await page.getByPlaceholder('Username').fill('standard_user');
    //Password field
    await page.getByPlaceholder('Password').fill('secret_sauce');
    
    //Login button
    await page.locator('[data-test="login-button"]').click();
    
    //End timeout
    await page.waitForTimeout(4000);
});