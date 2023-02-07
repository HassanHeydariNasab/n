export class N extends HTMLElement {
  constructor() {
    super();
  }
  state = {};

  updateElementText({ element }) {
    const newText = element.dataset.text?.replaceAll(
      /{(.*?)}/g,
      (_, group) => this.state[group]
    );
    if (element.textContent !== newText) {
      element.textContent = newText;
    }
  }

  updateElementAttribute({ element, attribute }) {
    const newValue = element.dataset[attribute]?.replaceAll(
      /{(.*?)}/g,
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

    const elements = [...this.querySelectorAll("*"), this];
    for (let element of elements) {
      // innerText
      const textDependencies = element.dataset?.text?.match(/{(.*?)}/);
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
        const dependencies = element.dataset[attribute]?.match(/{(.*?)}/);
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
