const db = require("./modules/data.module.js");
let { getBrowser } = require("./modules/browser.module.js");

const AutomationEngine = require("./modules/automationEngine.module.js");

async function main() {
  console.log(`Tester Script Started.`);

  let { browser, page } = await getBrowser(db.options);

  // 1. Wait for page to get loaded completely
  await page.waitForFunction(() => document.readyState === "complete");
  console.log(`\x1b[32mPage Loaded\x1b[0m`);
  // 2. Paste your Script here to Test something
  console.log(`\x1b[31mPage's URL: ${page.url()}\x1b[0m`);
  // ==================================================================================

  const elementHandle = await page.locator("#moreButton").waitHandle();
  // .then((e) => e.click());

  console.log(`elementHandle: ${elementHandle}`);
  await elementHandle.click();
  console.log(`elementHandle clicked.`);

  // ==================================================================================
  //   Note "#moreButton" is wrong selector
  console.log(`Tester Script Ended.`);
}
main();
