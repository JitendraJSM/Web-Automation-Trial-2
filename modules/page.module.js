// Type of initial URL : https://youtu.be/kNDPSKnNT8g?si=jA1cQh5sftzxgK0B

const loginPage = require("../Classes/loginPage.page.js");
const okWinHomePage = require("../Classes/okWinHomePage.page.js");

module.exports.pageFactory = async (page, url) => {
  console.log("In Page Factory checkpoint 1");

  await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 }); // Wait for network idle
  await page.waitForFunction(() => document.readyState === "complete", {
    timeout: 30000,
  });

  //----- Page Generation based on URL -----//
  url = await page.url();
  console.log("URL on current Page is : " + url);

  if (url.includes("example.com")) {
    console.log("Yes, it is example.com");
    return new examplePage(page);
  } else if (url.includes("youtu")) {
    if (url.includes("@")) {
      return new ytChannelsPage(page);
    } else if (url.includes("watch") || url.includes("youtu.be")) {
      // it is youtube's video url
      return new ytVideosPage(page);
    } else if (url.includes("shorts")) {
      // it is youtube's shorts url
      return new ytShortsPage(page);
    } else return new ytUnknownPage(page);
  } else if (url.includes("okwingame")) {
    // console.log('URL is identified as "okwingame"');
    // console.log("but i do not return okWinHomePage.");
    // console.log('That will be done in "pageIdentifier" function.');
    // return new okWinHomePage(page);
  }

  //----- Page Generation based on Element selectors -----//

  // 1. Collecting all ID selectors from imported class
  const pageSelectors = module.children
    .filter((m) => m.exports?.IDselectors)
    .map((m) => {
      return {
        pageName: m.exports.name,
        IDSelectors: m.exports.IDselectors,
      };
    });

  async function pageIdentifier(page, pageSelectors, timeout = 30000) {
    const pagePromises = pageSelectors.map(async (pageSelector) => {
      const resultedArray = await Promise.all(
        pageSelector.IDSelectors.map((IDSelector) =>
          page
            .waitForSelector(IDSelector, { timeout })
            // .then((el) => ({ el, IDSelector }))
            .then((el) => true)
            .catch(() => false)
        )
      );

      return resultedArray.every((result) => result) ? pageSelector : false;
    });

    const identifiedPage = await Promise.race(pagePromises);
    console.log("identifiedPage", identifiedPage);
    return identifiedPage;
  }

  const { pageName } = await pageIdentifier(page, pageSelectors);
  const pageClass = module.children.find(
    (m) => m.exports.name === pageName
  ).exports;

  const pageInstance = new pageClass(page);

  console.log(`pageInstance name is : ${await pageInstance.getPageName()}`);
  console.log(`pageInstance's URL is ${pageInstance.url}`);

  return pageInstance;
};

// async function pageIdentifier(page, pageSelectors, timeout = 30000) {
//   const elementPromises = pageSelectors.map(
//     (pageSelector) =>
//       new Promise((resolve, reject) => {
//         pageSelector.IDSelectors.map((selector) =>
//           page
//             .waitForSelector(selector, { timeout })
//             .then((el) => ({ el, selector }))
//             .catch(() => null)
//         );
//         resolve({
//           pageName: pageSelector.pageName,
//           selector: pageSelector.IDSelectors,
//           element: el,
//         });
//       })
//   );

//   const pageSelector = await Promise.race(elementPromises);

//   if (pageSelector) {
//     return pageSelector;
//   } else {
//     throw new Error("None of the elements appeared within the timeout.");
//   }
// }
/*
const testingFun = () => {
  const pageSelectors = module.children
    .filter((m) => m.exports?.IDselectors)
    .map((m) => {
      return {
        pageName: m.exports.name,
        IDSelectors: m.exports.IDselectors,
      };
    });

  console.log(pageSelectors);
};
testingFun();*/
