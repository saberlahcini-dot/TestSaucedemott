const { LoginPage } = require('./login.page');
const { InventoryPage } = require('./inventory.page');
const { CartPage } = require('./cart.page');
const { CheckoutPage } = require('./checkout.page');

class SauceDemoApp {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
    this.inventory = new InventoryPage(page);
    this.cart = new CartPage(page);
    this.checkout = new CheckoutPage(page);
  }
}

module.exports = { SauceDemoApp };