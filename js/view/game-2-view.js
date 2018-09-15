import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";
import game from "../data/game";

export default class GameTwoView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <section class="game">
      <p class="game__task">${game[this.state.level].question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${
  game[this.state.level].answers[0].src
}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${statsTemplate(this.state)}
    </section>
    `;
  }

  bind() {
    const gameAnswer = this.element.querySelectorAll(`.game__answer input`);

    gameAnswer.forEach((it) => {
      it.addEventListener(`input`, (evt) => {
        this.onAnswer(
            evt.target.value === game[this.state.level].answers[0].value
        );
      });
    });
  }

  onAnswer() {}
}
