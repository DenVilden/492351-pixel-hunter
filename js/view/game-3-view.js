import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";
import game from "../data/game";

export default class GameThreeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <section class="game">
      <p class="game__task">${game[this.state.level].question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${
  game[this.state.level].answers[0].src
}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${
  game[this.state.level].answers[1].src
}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${
  game[this.state.level].answers[2].src
}" alt="Option 3" width="304" height="455">
        </div>
      </form>
      ${statsTemplate(this.state)}
    </section>
    `;
  }

  bind() {
    const gameAnswer = this.element.querySelectorAll(`.game__option`);

    gameAnswer.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        this.onAnswer(evt.target.src === game[this.state.level].answers[2].src);
      });
    });
  }

  onAnswer() {}
}
