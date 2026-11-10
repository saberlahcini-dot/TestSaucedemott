const selectors = require('../selectors/inventory.selectors');

class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  title() {
    return this.page.locator(selectors.title);
  }

  product(name) {
    return this.page.locator(selectors.inventoryItem).filter({ hasText: name });
  }

  async addProductToCart(name) {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(name) {
    await this.product(name).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(value) {
    await this.page.locator(selectors.sortSelect).selectOption(value);
  }

  async productNames() {
    return this.page.locator(`${selectors.inventoryItem} [data-test="inventory-item-name"]`).allTextContents();
  }

  cartBadge() {
    return this.page.locator(selectors.cartBadge);
  }

  async openCart() {
    await this.page.locator(selectors.cartLink).click();
  }

  async logout() {
    await this.page.locator(selectors.menuButton).click();
    await this.page.locator(selectors.logoutLink).click();
  }
}

module.exports = { InventoryPage };