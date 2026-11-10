const fs = require('node:fs/promises');
const path = require('node:path');
require('dotenv').config();

function collectFailedTests(suites, parentTitles = []) {
  return suites.flatMap((suite) => {
    const titles = [...parentTitles, ...(suite.title ? [suite.title] : [])];
    const failed = (suite.specs || []).flatMap((spec) => {
      const failedResult = (spec.tests || []).flatMap((test) =>
        (test.results || [])
          .filter((result) => result.status === 'failed' || result.status === 'timedOut')
          .map(() => `- ${[...titles, spec.title].filter(Boolean).join(' > ')}`),
      );
      return failedResult.slice(0, 1);
    });
    return [...failed, ...collectFailedTests(suite.suites || [], titles)];
  });
}

async function main() {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env;
  if (!token || !chatId) {
    console.log('Telegram report skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.');
    return;
  }

  const reportPath = path.resolve('test-results/results.json');
  const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
  const stats = report.stats || {};
  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const skipped = stats.skipped || 0;
  const flaky = stats.flaky || 0;
  const status = failed > 0 ? 'FAILED' : 'PASSED';
  const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : '';
  const failures = collectFailedTests(report.suites || []).slice(0, 8);
  const message = [
    `<b>SauceDemo UI tests: ${status}</b>`,
    `Passed: ${passed} | Failed: ${failed} | Flaky: ${flaky} | Skipped: ${skipped}`,
    ...(failures.length ? ['', '<b>Failed tests</b>', ...failures] : []),
    ...(runUrl ? ['', `<a href="${runUrl}">View CI run</a>`] : []),
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!response.ok) {
    throw new Error(`Telegram API returned ${response.status}: ${await response.text()}`);
  }
  console.log('Telegram test report sent.');
}

main().catch((error) => {
  console.error('Unable to send Telegram report:', error.message);
  process.exitCode = 1;
});