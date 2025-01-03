// Working perfectly Well in coordination with newpage.module.js
class GmailSignInPage {
  // static IDselectors = ["#moreButton"];  // Not Needed
  static pageURL = "chrome://new-tab-page/";

  constructor(page) {
    this.page = page;
    this.pageName = "GmailSignInPage";
    this.pageURL = "chrome://new-tab-page/";

    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: "#input",
        action: "fillToSignIn",
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
    return "GmailSignInPage";
  }

  async fillToSignIn() {
    console.log(`fillToSignIn Function Called`);

    const para = await this.locator("#input").waitHandle();
    const text = await this.evaluate((element) => {
      element.value = "Gmail SignIn";
    }, para);
    console.log(text);
  }
  // Remove this given below function if there is no more selector for "span ::-p-text(Confirm)"
}
module.exports = GmailSignInPage;
