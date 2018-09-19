const mainElement = document.querySelector(`#main`);

export const renderTemplate = (template = ``) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const changeView = (view) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(view.element);
};

export const renderGame = (element1, element2) => {
  const root = document.createElement(`div`);
  root.appendChild(element1.element);
  root.appendChild(element2.element);
  return root;
};

export const checkIfElementExist = (array, url) => {
  for (const element of array) {
    if (element.image.url === url) {
      return true;
    }
  }
  return false;
};

export const getCorrectAnswers = (array, answer) => {
  let index = 0;
  for (const element of array) {
    if (element.completed !== answer) {
      index++;
    }
  }
  return index;
};

export const getBonusAnswers = (array, answer) => {
  let index = 0;
  for (const element of array) {
    if (element.completed === answer) {
      index++;
    }
  }
  return index;
};
