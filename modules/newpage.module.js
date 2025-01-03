// const examplePage = require("../Classes/examplePage.page.js");
const GmailSignInPage = require("../Classes/gmailSignInPage.page.js");
// const okWinHomePage = require("../Classes/okWinHomePage.page.js");

const importedPages = module.children
  .filter((m) => m.exports?.pageURL)
  .map((m) => {
    return {
      pageClassName: m.exports.name,
      pageURL: m.exports.pageURL,
      pageConstructor: m.exports,
    };
  });

const pageFactory = async (page, pageStack) => {
  try {
    //   1. Wait for page to get loaded completely
    await page.waitForFunction(() => document.readyState === "complete");

    //   2. Identify on the basis of Page URL
    let url = await page.url();
    let currentPage;

    //   3. Check that page is already created or not
    console.count(
      `\x1b[32mCheck point 1 pageStack length: ${pageStack.length}\x1b[0m`
    );

    if (pageStack.length > 0) {
      console.log(`-------- PageStack is not empty --------`);
      console.log(`pageStack: ${pageStack.map((p) => p.pageName)}`);

      currentPage = pageStack.find((p) => url === p.pageURL);
      // currentPage = findPageByURLFromArray(pageStack, url);
      if (currentPage) {
        console.log(
          `Page is already created for this URL: ${currentPage.pageURL}`
        );
        return currentPage;
      }
    }

    let currentPageClass = findPageByURLFromArray(importedPages, url);
    // importedPages.find((p) => url === p.pageURL) ||
    // importedPages.reduce(
    //   (max, url) =>
    //     url.startsWith(p.pageURL) && url.length > max.length ? url : max,
    //   ""
    // );

    function findPageByURLFromArray(pageArray, URLtoFind) {
      return (
        pageArray.find((p) => URLtoFind === p.pageURL) ||
        pageArray.reduce(
          (max, URLtoFind) =>
            URLtoFind.startsWith(p.pageURL) && URLtoFind.length > max.length
              ? URLtoFind
              : max,
          ""
        )
      );
    }
    if (!currentPageClass)
      throw new Error("Page's URL is not matched with any imported page.");

    //   3. Create a new instance of the identified page object, push to pageStack and return
    currentPage = new currentPageClass.pageConstructor(page);
    pageStack.push(currentPage);
    console.count(
      `\x1b[33mCheck point 2 pageStack length: ${pageStack.length}\x1b[0m`
    );

    return currentPage;
  } catch (e) {
    console.log("Error in pageFactory function : ", e.message);
  }
};

module.exports.pageFactory = pageFactory;
// =======================================================
