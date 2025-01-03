// Working perfectly Well in coordination with newpage.module.js
class examplePage {
  // static IDselectors = ["#moreButton"];  // Not Needed
  static pageURL = "https://example.com/";

  constructor(page) {
    this.page = page;
    this.pageName = "examplePage";
    this.pageURL = "https://example.com/";

    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: "p",
        action: "paraConsole",
        actionType: "pageFunction",
      },
      // {
      //   selector: "span ::-p-text(Win Go)",
      //   action: "click",
      //   actionType: "elemental",
      //   navigator: true,
      // },
      // {
      //   selector: "span ::-p-text(Confirm)",
      //   action: "click",
      //   actionType: "elemental",
      //   overflowElement: true,
      // },
      // {
      //   selector: "div.close",
      //   action: "click",
      //   actionType: "elemental",
      //   overflowElement: true,
      // },
      // {
      //   selector: "span ::-p-text(Win Go)",
      //   action: "click",
      //   actionType: "elemental",
      //   overflowElement: true,
      // },
    ];
    this.currentState = this.automationQueue[this.currentStateIndex];

    // Create a proxy to delegate method calls
    return new Proxy(this, {
      get(target, prop) {
        // Check if the property exists on the page instance
        if (typeof target.page[prop] === "function") {
          return (...args) => target.page[prop](...args);
        }
        // Otherwise, return the property from target
        return target[prop];
      },
    });
  }

  async getPageName() {
    return "examplePage";
  }

  async paraConsole() {
    console.log(`Para Console Function Called`);

    const para = await this.locator("p").waitHandle();
    const text = await this.evaluate((element) => element.textContent, para);
    console.log(text);
  }
  // Remove this given below function if there is no more selector for "span ::-p-text(Confirm)"
}
module.exports = examplePage;
