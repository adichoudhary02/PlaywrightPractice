import {test, expect} from '@playwright/test'

test('login page',async({page}) => {

    //Go to the saucedemo website
    await page.goto('https://www.saucedemo.com/');

    //Check for the title
    await expect(page).toHaveTitle('Swag Labs');

    //SwagLabs Text
    await expect(page.getByText('Swag Labs')).toBeVisible();
      
    //UserName field
    await page.getByPlaceholder('Username').fill('standard_user');

    //Password field
    await page.getByPlaceholder('Password').fill('secret_sauce');
    
    //Login button
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    await expect(page.locator('[data-test = "inventory-list"]')).toBeVisible();

    const items = page.locator('[data-test="inventory-item"]');

    const count = await items.count();
    for (let i = 0; i < count; i++) {
        console.log(`---------(ITEM NO: ${i+1})---------`)
        let item = items.nth(i);
        let item_name = await item.locator('[data-test="inventory-item-name"]').textContent();
        console.log(`Item : ${item_name}`);

        let item_desc = await item.locator('[data-test="inventory-item-desc"]').textContent();
        console.log(`Desc : ${item_desc}`);

        let item_price = await item.locator('[data-test="inventory-item-price"]').textContent();
        console.log(`Price : ${item_price}`);
        
        item.locator('[data-test="inventory-item-name"]').click();

        await expect(page.locator('[id = "inventory_item_container"]')).toBeVisible();

        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(item_name); console.log("Item name Matched");
        await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(item_desc); console.log("Item desc Matched");
        await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(item_price); console.log("Item price Matched");

        //await page.waitForTimeout(0);
        await page.goBack();
     }

    
    //End timeout
    await page.waitForTimeout(4000);
});