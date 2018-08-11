const mainElement = document.querySelector(`#main`);

// Создает шаблон экрана
export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

// Клонирует шаблон в разметку
export const selectSlide = (element) => {
  mainElement.textContent = ``;
  mainElement.appendChild(element);
};
