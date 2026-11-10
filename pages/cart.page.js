const selectors = require('../selectors/cart.selectors');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  title() {
    return this.page.locator(selectors.title);
  }

  item(name) {
    return this.page.locator(selectors.cartItem).filter({ hasText: name });
  }

  async checkout() {
    await this.page.locator(selectors.checkoutButton).click();
  }

  async continueShopping() {
    await this.page.locator(selectors.continueShoppingButton).click();
  }
}

module.exports = { CartPage };