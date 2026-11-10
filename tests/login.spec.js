const { test, expect } = require('../fixtures/test.fixture');

const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';

test.describe('Login', () => {
  test('allows a standard user to sign in', async ({ app }) => {
    await app.login.open();
    await app.login.login(username, password);

    await expect(app.inventory.title()).toHaveText('Products');
    await expect(app.login.logo()).toBeVisible();
  });

  test('shows an error for a locked out user', async ({ app }) => {
    await app.login.open();
    await app.login.login('locked_out_user', password);

    await expect(app.login.errorMessage()).toContainText('locked out');
  });

  test('shows an error for an incorrect password', async ({ app }) => {
    await app.login.open();
    await app.login.login(username, 'incorrect-password');

    await expect(app.login.errorMessage()).toContainText('do not match');
  });
});