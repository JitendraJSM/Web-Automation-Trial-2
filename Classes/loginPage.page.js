class loginPage {
  static IDselectors = [".login__container"];
  static pageURL = "https://okwingame.com/#/login";

  static currentStateIndex = 0;

  constructor(page) {
    this.page = page;
    this.pageName = "loginPage";
    this.pageURL = "https://okwingame.com/#/login";

    this.credentials = {
      userName: "7378213218" || process.env.OKWINGAME_USERNAME,
      password: "hhjsm001" || process.env.OKWINGAME_PASSWORD,
    };

    this.currentStateIndex = 0;
    this.automationQueue = [
      {
        selector: 'input[placeholder="Password"]',
        action: "fillLoginDetails",
        actionType: "pageFunction",
      },
      {
        selector: "button ::-p-text(Log in)",
        action: "click",
        actionType: "elemental",
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
    return "loginPage";
  }

  async performActions() {
    await this.page.waitForSelector(".login-input");
    await this.page.fill(".login-input", process.env.OKWINGAME_USERNAME);
    await this.page.fill(
      ".login-input + input",
      process.env.OKWINGAME_PASSWORD
    );
    await this.page.click(".login-btn");
  }

  async fillLoginDetails() {
    await this.page.evaluate(async (credentials) => {
      let elUsername = document.querySelector('input[name="userNumber"]');
      let elPassword = document.querySelector('input[placeholder="Password"]');

      elUsername.value = ` `;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      elUsername.value = `${credentials.userName}`;

      elPassword.value = ` `;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      elPassword.value = `${credentials.password}`;
    }, this.credentials);
  }
}

module.exports = loginPage;
