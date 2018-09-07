import {render, selectSlide} from "./util";
import {screenTemplate} from "./screen";
import greetingScreen from "./greeting";
import data from "./data/game-data";
import screenHeaderButton from "./screen-header-button";

const template = `
    <header class="header">
      ${screenHeaderButton}
    </header>
    <section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок">
        </li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>
`;

export default () => {
  const rulesScreen = render(template);

  const rulesInput = rulesScreen.querySelector(`.rules__input`);

  // Отключает кнопку если input пустой
  rulesInput.addEventListener(`input`, (evt) => {
    return (rulesButton.disabled = evt.target.value.length === 0);
  });

  const rulesButton = rulesScreen.querySelector(`.rules__button`);
  rulesButton.addEventListener(`click`, () =>
    selectSlide(screenTemplate(data.initialState))
  );

  const backButton = rulesScreen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => selectSlide(greetingScreen()));

  return rulesScreen;
};
