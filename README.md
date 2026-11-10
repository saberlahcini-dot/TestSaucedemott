# SauceDemo Playwright Framework

JavaScript end-to-end tests for [SauceDemo](https://www.saucedemo.com/) using Playwright Test, the Page Object Model, and selectors stored separately from page behavior.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

On Windows, `npx playwright install chromium` is sufficient. Copy `.env.example` to `.env` to override the demo account credentials. The public demo defaults are `standard_user` / `secret_sauce`.

## Run tests

```bash
npm test                 # headless Chromium suite
npm run test:headed      # run with a visible browser
npm run test:debug       # open Playwright Inspector
npm run report:telegram  # send the latest JSON result, if Telegram is configured
```

The suite covers successful and rejected login, product sorting, cart add/remove, and a complete checkout. Test artifacts are written to `test-results/` and the HTML report to `playwright-report/`.

## Project layout

```text
pages/                  Page objects and the app facade
selectors/              Page-specific selector definitions
fixtures/                Shared Playwright fixtures
tests/                  User-facing scenarios
scripts/                CI report delivery
.github/workflows/       GitHub Actions workflow
```

Selectors use stable IDs or accessible roles/names where available. Keep locator changes in `selectors/` and user interactions/assertion-friendly page methods in `pages/`.

## GitHub Actions and Telegram

The workflow runs on pushes, pull requests, and manual dispatch. To enable Telegram notifications, add these repository Actions secrets:

- `TELEGRAM_BOT_TOKEN`: token from BotFather
- `TELEGRAM_CHAT_ID`: destination chat or group ID; the bot must be allowed to post there

The report step runs even if tests fail. Without both secrets, it logs a skip and CI tests still run. The Telegram message includes pass/fail/skip totals and a link to the workflow run. The HTML report and test artifacts are uploaded by Actions for 14 days.

For local Telegram reporting, set the same two environment variables before running `npm run report:telegram`; no Telegram secrets are needed to run tests.
