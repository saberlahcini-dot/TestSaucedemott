const { test: base, expect } = require('@playwright/test');
const { SauceDemoApp } = require('../pages/sauce-demo.app');

const test = base.extend({
  app: async ({ page }, use) => {
    await use(new SauceDemoApp(page));
  },
});

module.exports = { test, expect };