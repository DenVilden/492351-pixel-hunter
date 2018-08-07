"use strict";

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const mainElement = document.querySelector(`#main`);

// Клонирует экран в central
const selectSlide = (element) => {
  mainElement.textContent = ``;
  mainElement.appendChild(element.cloneNode(true));
};

// Фильтрует и собирает все экраны в массив
const screens = Array.from(document.querySelectorAll(`template`)).map(
    (it) => it.content
);
screens.shift();
screens.splice(-3);

// Переключает экраны
let current = 0;
const select = (index) => {
  index = index < 0 ? 0 : index;
  index = index >= screens.length ? screens.length - 1 : index;
  current = index;
  selectSlide(screens[current]);
};

// Добавляет переключение с клавиатуры
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case LEFT_ARROW:
      select(current - 1);
      break;
    case RIGHT_ARROW:
      select(current + 1);
      break;
  }
});

select(0);

// Добавляет стрелки навигации
const renderArrows = () => {
  const div = document.createElement(`div`);
  div.setAttribute(`class`, `arrows__wrap`);

  div.innerHTML = `
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
`;

  return document.querySelector(`body`).appendChild(div);
};

renderArrows();

document.querySelectorAll(`.arrows__btn`)[0].addEventListener(`click`, () => {
  select(current - 1);
});

document.querySelectorAll(`.arrows__btn`)[1].addEventListener(`click`, () => {
  select(current + 1);
});
