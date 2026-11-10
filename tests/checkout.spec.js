const { test, expect } = require('../fixtures/test.fixture');

const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';

test('completes checkout for a product', async ({ app }) => {
    await app.login.open();
    await app.login.login(username, password);
    await app.inventory.addProductToCart('Sauce Labs Backpack');
    await app.inventory.openCart();
    await app.cart.checkout();

    await app.checkout.fillInformation({
        firstName: 'saber',
        lastName: 'lahcini',
        postalCode: '10001',
    });
    await expect(app.checkout.subtotal()).toContainText('$29.99');
    await app.checkout.finish();

    await expect(app.checkout.confirmation()).toHaveText('Thank you for your order!');
    });