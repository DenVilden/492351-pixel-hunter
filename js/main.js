"use strict";

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

const mainElement = document.querySelector(`#main`);

// Клонирует экран в central
function selectSlide(element) {
  mainElement.textContent = ``;
  mainElement.appendChild(element.cloneNode(true));
}

// Собирает все экраны в массив
const screens = Array.from(document.querySelectorAll(`template`)).map(
    (it) => it.content
);

// Переключает экраны
let current = 0;
function select(index) {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
}

// Добавляет переключение с клавиатуры
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

select(0);

// Добавляет стрелки навигации
function renderArrows() {
  const div = document.createElement(`div`);
  div.setAttribute(`class`, `arrows__wrap`);
  div.style.position = `absolute`;
  div.style.top = `95px`;
  div.style.left = `50%`;
  div.style.marginLeft = `-56px`;

  const rightButton = document.createElement(`button`);
  rightButton.setAttribute(`class`, `arrows__btn`);
  rightButton.style.background = `none`;
  rightButton.style.border = `2px solid black`;
  rightButton.style.padding = `5px 20px`;

  div.appendChild(rightButton);
  rightButton.addEventListener(`click`, () => {
    select(current + 1);
  });

  const leftButton = rightButton.cloneNode(true);
  div.appendChild(leftButton);
  leftButton.addEventListener(`click`, () => {
    select(current - 1);
  });

  document.querySelector(`body`).appendChild(div);

  return div;
}

renderArrows();
