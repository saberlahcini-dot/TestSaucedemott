const { test, expect } = require('../fixtures/test.fixture');

const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';
const productName = 'Sauce Labs Backpack';

test.describe('Inventory and cart', () => {
  test.beforeEach(async ({ app }) => {
    await app.login.open();
    await app.login.login(username, password);
  });

  test('sorts products by name', async ({ app }) => {
    await app.inventory.sortBy('az');
    const names = await app.inventory.productNames();

    expect(names).toEqual([...names].sort((first, second) => first.localeCompare(second)));
  });

  test('adds and removes a product from the cart', async ({ app }) => {
    await app.inventory.addProductToCart(productName);
    await expect(app.inventory.cartBadge()).toHaveText('1');

    await app.inventory.openCart();
    await expect(app.cart.item(productName)).toBeVisible();
    await app.cart.item(productName).getByRole('button', { name: 'Remove' }).click();
    await expect(app.cart.item(productName)).toHaveCount(0);
  });
});