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

export const checkIfElementExist = (array, answer, url) => {
  const question = [];

  for (const iterator of array) {
    if (iterator.type === answer) {
      question.push(iterator);
    }
  }

  return question[0].image.url === url;
};

export const getCorrectAnswers = (array, answer) => {
  let index = 0;
  for (let element of array) {
    if (element !== answer) {
      index++;
    }
  }
  return index;
};

export const getBonusAnswers = (array, answer) => {
  let index = 0;
  for (let element of array) {
    if (element === answer) {
      index++;
    }
  }
  return index;
};
