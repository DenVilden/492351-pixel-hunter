import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";
import game from "../data/game";

export default class GameOneView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <section class="game">
      <p class="game__task">${game[this.state.level].question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${
  game[this.state.level].answers[0].src
}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${
  game[this.state.level].answers[1].src
}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="paint">
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
    // Change screen if both inputs are checked
    gameAnswer.forEach((it) => {
      it.addEventListener(`input`, () => {
        const radio = this.element.querySelectorAll(
            `.game__answer input:checked`
        );

        // Check if clicked element matches data
        if (radio.length === 2) {
          this.onAnswer(
              radio[0].value === game[this.state.level].answers[0].value &&
              radio[1].value === game[this.state.level].answers[1].value
          );
        }
      });
    });
  }

  onAnswer() {}
}
