import AbstractView from './abstract-view';
import BackButtonController from '../controller/back-button-controller';

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.button = new BackButtonController();
  }

  get template() {
    return `
      <header class="header"></header>
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>
            Угадай 10 раз для каждого изображения фото
            <img
              class="rules__icon"
              src="img/icon-photo.png"
              width="32"
              height="31"
              alt="Фото"
            />
            или рисунок
            <img
              class="rules__icon"
              src="img/icon-paint.png"
              width="32"
              height="31"
              alt="Рисунок"
            />
          </li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя" />
          <button class="rules__button  continue" type="submit" disabled>
            Go!
          </button>
        </form>
      </section>
    `;
  }

  bind() {
    const header = this.element.querySelector(`.header`);
    header.appendChild(this.button.element);

    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesButton = this.element.querySelector(`.rules__button`);

    // Disable button if input is empty
    rulesInput.addEventListener(`input`, evt => {
      rulesButton.disabled = evt.target.value.length === 0;
    });

    rulesButton.addEventListener(`click`, () => this.onClick(rulesInput.value));
  }

  onClick() {}
}
