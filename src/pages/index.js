const body = document.getElementsByTagName("body")[0];

const state = {};
function updateState(update = {}) {
  let keys = Object.keys(update);
  for (let key of keys) {
    state[key] = update[key];
  }

  const elements = body.querySelectorAll("*");
  for (let element of elements) {
    // innerText
    const textDependencies = element.dataset?.text?.match(/{(.*?)}/);
    if (
      textDependencies?.some((dep) => keys.includes(dep)) ||
      element.innerText.length === 0
    ) {
      updateElementText(element);
    }
    // attributes
    const attributes = Object.keys(element.dataset);
    for (let attribute of attributes) {
      const dependencies = element.dataset[attribute]?.match(/{(.*?)}/);
      if (
        dependencies?.some((dep) => keys.includes(dep)) ||
        !element.hasAttribute(attribute)
      ) {
        updateElementAttribute(element, attribute);
      }
    }
  }
}

function updateElementText(element) {
  const newText = element.dataset.text?.replaceAll(
    /{(.*?)}/g,
    (_, group) => state[group]
  );
  if (element.innerText !== newText) {
    element.textContent = newText;
  }
}

function updateElementAttribute(element, attribute) {
  const newValue = element.dataset[attribute]?.replaceAll(
    /{(.*?)}/g,
    (_, group) => state[group]
  );
  if (element.getAttribute(attribute) !== newValue) {
    element.setAttribute(attribute, newValue);
  }
}

// DX

setTimeout(() => {
  updateState({ what: "Everything", name: "Najmeh", color: "red" });
}, 1000);

function onClickWelcome(event) {
  console.log(event);
}
