import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";

export default class GameTwoView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="705"
              height="455"
            />
            <label class="game__answer  game__answer--photo">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="painting"
              />
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        ${statsTemplate(this.state.answers)}
      </section>
    `;
  }

  bind() {
    const gameAnswer = this.element.querySelectorAll(`.game__answer input`);

    gameAnswer.forEach((it) => {
      it.addEventListener(`input`, (evt) => {
        this.onAnswer(
            evt.target.value === this.data[this.state.level].answers[0].type
        );
      });
    });
  }

  onAnswer() {}
}
