import { N } from "./../N.js";

export class NPage extends N {
  constructor() {
    super();
    this.state = { where: "Nowhere", name: "Hassan", color: "red" };
    this.template = `<slot name="content"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.timeout = setTimeout(() => {
      this.updateState({ where: "Everywhere", name: "Najmeh", color: "green" });
    }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
