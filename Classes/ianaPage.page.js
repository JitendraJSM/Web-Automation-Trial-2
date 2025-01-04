// Working perfectly Well in coordination with newpage.module.js
class ianaPage {
  // static IDselectors = ["#moreButton"];  // Not Needed
  static pageURL = "https://www.iana.org/help/example-domains";

  constructor(page) {
    this.page = page;
    this.pageName = "ianaPage";
    this.pageURL = "https://www.iana.org/help/example-domains";

    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: "h1",
        action: "getText",
        actionType: "pageFunction",
      },
      {
        selector: "a ::-p-text(IANA-managed Reserved Domains)",
        action: "navigateTo",
        actionType: "pageFunction",
        navigator: true,
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
    return "ianaPage";
  }

  async getText() {
    console.log(`Get Text Function Called`);
    const selector = this.automationQueue[this.currentStateIndex].selector;
    const el = await this.locator(selector).waitHandle();
    const text = await this.evaluate((element) => element.textContent, el);
    console.log(text);
  }

  async navigateTo() {
    console.log(`navigateTo Function Called`);
    this.goto("https://example.com/");
    console.log(`going to "https://example.com/"`);
  }
  // Remove this given below function if there is no more selector for "span ::-p-text(Confirm)"
}
module.exports = ianaPage;
