import { N } from "./../N.js";

export class ForLoop extends N {
  constructor() {
    super();
    this.state = { count: 0, color: "red" };
    this.template = `
        <span data-text="{count} seconds" data-style="color: {color}" style="color: red">0 seconds</span>
      `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => {
      this.updateState({
        count: this.state.count + 1,
        color: (this.state.count + 1) % 2 ? "red" : "green",
      });
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
