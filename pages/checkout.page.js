const selectors = require('../selectors/checkout.selectors');

class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillInformation({ firstName, lastName, postalCode }) {
    await this.page.locator(selectors.firstNameInput).fill(firstName);
    await this.page.locator(selectors.lastNameInput).fill(lastName);
    await this.page.locator(selectors.postalCodeInput).fill(postalCode);
    await this.page.locator(selectors.continueButton).click();
  }

  subtotal() {
    return this.page.locator(selectors.subtotal);
  }

  async finish() {
    await this.page.locator(selectors.finishButton).click();
  }

  confirmation() {
    return this.page.locator(selectors.completeHeader);
  }
}

module.exports = { CheckoutPage };