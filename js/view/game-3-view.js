import AbstractView from './abstract-view';
import statsTemplate from '../templates/stats-template';
import { checkIfElementExist } from '../util';

export default class GameThreeView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="304"
              height="455"
            />
          </div>
          <div class="game__option  game__option--selected">
            <img
              src="${this.data[this.state.level].answers[1].image.url}"
              alt="Option 2"
              width="304"
              height="455"
            />
          </div>
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[2].image.url}"
              alt="Option 3"
              width="304"
              height="455"
            />
          </div>
        </form>
        ${statsTemplate(this.state.answers)}
      </section>
    `;
  }

  bind() {
    const gameAnswer = this.element.querySelectorAll(`.game__option`);
    const isRight = this.element.querySelector(`.game__task`);

    const getBonusAnswers = evt => {
      if (isRight.textContent === `Найдите фото среди изображений`) {
        return checkIfElementExist(
          this.data[this.state.level].answers,
          `photo`,
          evt.target.src
        );
      }

      return isRight.textContent === `Найдите рисунок среди изображений`
        ? checkIfElementExist(
            this.data[this.state.level].answers,
            `painting`,
            evt.target.src
          )
        : null;
    };

    gameAnswer.forEach(it => {
      it.addEventListener(`click`, evt => this.onAnswer(getBonusAnswers(evt)));
    });
  }

  onAnswer() {}
}
