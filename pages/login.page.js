const selectors = require('../selectors/login.selectors');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.page.locator(selectors.usernameInput).fill(username);
    await this.page.locator(selectors.passwordInput).fill(password);
    await this.page.locator(selectors.loginButton).click();
  }

  errorMessage() {
    return this.page.locator(selectors.errorMessage);
  }

  logo() {
    return this.page.locator(selectors.appLogo);
  }
}

module.exports = { LoginPage };