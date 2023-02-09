export class N extends HTMLElement {
  constructor() {
    super();
    this.elements = [this];
    this.template = "";
  }
  state = {};
  static stateRegex = /{(.*?)}/;
  static stateReplaceAllRegex = /{(.*?)}/g;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
    // TODO update this.elements when elements added or removed.
    this.elements.push(...this.shadowRoot.querySelectorAll("*"));
    console.log(this.elements);
  }

  updateElementText({ element }) {
    const newText = element.dataset.text?.replaceAll(
      N.stateReplaceAllRegex,
      (_, group) => this.state[group]
    );
    if (element.textContent !== newText) {
      element.textContent = newText;
    }
  }

  updateElementAttribute({ element, attribute }) {
    const newValue = element.dataset[attribute]?.replaceAll(
      N.stateReplaceAllRegex,
      (_, group) => this.state[group]
    );
    if (element.getAttribute(attribute) !== newValue) {
      element.setAttribute(attribute, newValue);
    }
  }

  updateState(update = {}) {
    let keys = Object.keys(update);
    for (let key of keys) {
      this.state[key] = update[key];
    }

    for (let element of this.elements) {
      // innerText
      const textDependencies = element.dataset?.text?.match(N.stateRegex);
      if (
        textDependencies?.some((dep) => keys.includes(dep)) ||
        element.textContent.length === 0
      ) {
        this.updateElementText({ element });
      }
      // attributes
      const attributes = Object.keys(element.dataset).filter(
        (attribute) => attribute !== "text"
      );
      for (let attribute of attributes) {
        const dependencies = element.dataset[attribute]?.match(N.stateRegex);
        if (
          dependencies?.some((dep) => keys.includes(dep)) ||
          !element.hasAttribute(attribute)
        ) {
          this.updateElementAttribute({ element, attribute });
        }
      }
    }
  }
}
