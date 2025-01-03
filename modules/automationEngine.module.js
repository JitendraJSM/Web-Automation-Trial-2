const { pageFactory } = require("../modules/newpage.module.js");

// Function to wait for an element to be visible and returns true if visible otherwise throws an error
const waitForVisibleElement = async (page, selector) => {
  try {
    await page.locator(selector).wait({ state: "visible", timeout: 30000 });
    // console.log(`Element visible: ${selector}`);
    return true;
  } catch (e) {
    throw new Error(`Selector not found: ${selector}`);
  }
};

// Function to create promises for all states in the queue
const createArrayOfPromises = (page) => {
  console.log("Automation Queue breaked so going to create Array of Promises");

  let isResolved = false; // Flag to track if a promise has resolved

  return page.automationQueue.map((state, index) => {
    return new Promise(async (resolve) => {
      try {
        const isVisible = await waitForVisibleElement(page, state.selector);
        if (!isResolved) {
          isResolved = true; // Mark as resolved
          resolve(index); // Resolve this promise
        } else {
          resolve(false); // Resolve but with false if already resolved
        }
      } catch (error) {
        if (isResolved) resolve(false);
        else {
          console.log(`No Element of page "${page.pageName}" found`);
          console.log(
            "The List of Elements the script is waited For are as follows:"
          );
          console.log(page.automationQueue.map((a) => a.selector));
          console.log("Check the page is loaded or not");
        }
        // console.log("Error of Create Array of Promises", error);
      }
    });
  });
};

async function stateIdentifier(page) {
  try {
    await waitForVisibleElement(
      page,
      page.automationQueue[page.currentStateIndex].selector
    );

    return page.currentStateIndex;
  } catch (e) {
    const elementPromises = createArrayOfPromises(page);

    return await Promise.race(elementPromises);
  }
}

async function processAction(page) {
  // console.log(`State : ${page.currentState}`);

  // Wait for the element handle to be available
  const elementHandle = await page
    .locator(page.currentState.selector)
    .waitHandle();

  // Scroll the element into view
  await page.evaluate((element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, elementHandle);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (page.currentState.actionType === "elemental")
    await elementHandle[page.currentState.action]();
  else if (page.currentState.actionType === "pageFunction") {
    await page[page.currentState.action]();
  }
  console.log(
    `Action Done : ${page.currentState.action} on ${page.currentState.selector} on ${page.pageName}`
  );
  console.log(
    `Current State Index : ${page.currentStateIndex} of page ${page.pageName}`
  );
  return true;
}
async function executeAutomationQueue(page) {
  // page.currentStateIndex = 0; // Always Start with index 0
  // page.currentState = page.automationQueue[page.currentStateIndex]; // Make this & above line as page.currentStateRefresh(currentStateIndex)

  while (page.currentStateIndex < page.automationQueue.length) {
    console.log(`CP 1 of while loop of Automation Engine: ${page.pageName}`);

    page.currentStateIndex = await stateIdentifier(page);

    page.currentState = page.automationQueue[page.currentStateIndex];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await processAction(page);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    page.currentStateIndex++;

    if (page.currentState.navigator) {
      console.log("As this is a navigator action so Navigating to next page.");
      // break;
      return "navigation";
    }
    console.log(
      `End of while loop for page ${page.pageName}, currentStateIndex : ${page.currentStateIndex}, Aq Length : ${page.automationQueue.length}`
    );
  }
  console.log("Automation Queue Completed");
  return "Queue Completed";
}
// ----------------Main Script----------------//
async function AutomationEngine(page) {
  let flag = true;
  const pageStack = [];
  while (flag) {
    //   1. Idenetify & modify the page
    page = await pageFactory(page, pageStack);
    console.log(`Page Name : ${page.pageName}`);
    console.count(`\x1b[31mIn Automation Engine Loop\x1b[0m`);
    console.log(
      `\x1b[32mPage ${page.pageName} has currentStateIndex : ${page.currentStateIndex}\x1b[0m`
    );

    // ------ As now the page have autmation queue so....

    //   2. Execute the automation queue
    flag = await executeAutomationQueue(page);

    if (flag === "Queue Completed") {
      flag = false;
      console.log(`\x1b[33m====  Queue Completed   ====\x1b[0m\x1b[0m`);
      console.log(
        `As current page Index === ${page.currentStateIndex} and the AQ Length ${page.automationQueue.length}`
      );
    }

    /* Below Sniipet is not required as pageFactory by default always wait for page to get loaded before anything  

      if (flag === "navigation") {
      // Wait for page to get loaded completely
      await page.waitForFunction(() => document.readyState === "complete");
      console.log(`New Page is ready to be used.`);
    }
      */
  }
  return "Everthing is done by AutomationEngine";
}
module.exports = AutomationEngine;
