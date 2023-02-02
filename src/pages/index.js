const body = document.getElementsByTagName("body")[0];

const state = {};
function updateState(update = {}) {
  let keys = Object.keys(update);
  for (let key of keys) {
    state[key] = update[key];
  }

  const elements = body.querySelectorAll("*");
  for (let element of elements) {
    if (element.dataset.dep?.split(";").some((dep) => keys.includes(dep))) {
      updateElement(element);
    }
  }
}

function updateElement(element) {
  element.innerText = element.dataset.text.replaceAll(
    /{(.*?)}/g,
    (x, group) => state[group]
  );
}

updateState({ what: "Everything", name: "Najmeh" });
