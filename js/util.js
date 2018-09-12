const mainElement = document.querySelector(`#main`);

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const show = (element) => {
  mainElement.textContent = ``;
  mainElement.appendChild(element);
};

export const renderHeader = (element, sibling) => {
  sibling.element.prepend(element.element);
};
