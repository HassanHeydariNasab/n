import { N } from "./../N.js";

export class MyFlasher extends N {
  constructor() {
    super();
    this.state = { count: 0, color: "red" };
  }

  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => {
      this.updateState({
        count: this.state.count + 1,
        color: (this.state.count + 1) % 2 ? "red" : "green",
      });
    }, 500);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
