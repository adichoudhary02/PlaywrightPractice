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

    let itemCount = 0;
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

        await item.locator("[data-test^='add-to-cart-']").click();
        itemCount++;
        
        let itemInCart = await page.locator('[data-test="shopping-cart-badge"]').textContent();
        if (itemInCart == itemCount) console.log("Cart Badge number matched : "+ itemInCart);
       
     }

     await page.locator("[data-test='shopping-cart-link']").click();

     await expect(page).toHaveURL(/cart/);
     await expect(page.getByText('Your Cart')).toBeVisible();
     console.log("++++++++ In Cart ++++++++"); 

     
     await expect(page.locator('[data-test = "cart-list"]')).toBeVisible();
     const itemsCart = page.locator('[data-test="inventory-item"]');

    const cartCount = await items.count();
    
     for(let i = 0; i < cartCount; i++) {
        console.log(`---------(ITEM NO: ${i+1})---------`)
        let itemCart = itemsCart.nth(i);
        let item = items.nth(i);

        let item_nameCart = await itemCart.locator('[data-test="inventory-item-name"]').textContent();
        let item_name = await item.locator('[data-test="inventory-item-name"]').textContent();
        
        if(item_name == item_nameCart) console.log(`Item name matched: ${item_nameCart}`);

        let item_descCart = await itemCart.locator('[data-test="inventory-item-desc"]').textContent();
        let item_desc = await itemCart.locator('[data-test="inventory-item-desc"]').textContent();

        
        if(item_desc == item_descCart) console.log(`Item desc matched: ${item_descCart}`);

        let item_priceCart = await itemCart.locator('[data-test="inventory-item-price"]').textContent();
        let item_price = await itemCart.locator('[data-test="inventory-item-price"]').textContent();

        
        if(item_price == item_priceCart) console.log(`Item name matched: ${item_nameCart}`);

     }
    await page.waitForTimeout(4000);
});