class okWinHomePage {
  static IDselectors = ["#home"];
  static pageURL = "https://okwingame.com/#/";

  constructor(page) {
    this.page = page;
    this.pageName = "okWinHomePage";
    this.pageURL = "https://okwingame.com/#/";

    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: "i.close",
        action: "click",
        actionType: "elemental",
      },
      {
        selector: "span ::-p-text(Win Go)",
        action: "click",
        actionType: "elemental",
        navigator: true,
      },
      {
        selector: "span ::-p-text(Confirm)",
        action: "click",
        actionType: "elemental",
        overflowElement: true,
      },
      {
        selector: "div.close",
        action: "click",
        actionType: "elemental",
        overflowElement: true,
      },
      {
        selector: "span ::-p-text(Win Go)",
        action: "click",
        actionType: "elemental",
        overflowElement: true,
      },
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
    return "okWinHomePage";
  }

  // Remove this given below function if there is no more selector for "span ::-p-text(Confirm)"
}
module.exports = okWinHomePage;
