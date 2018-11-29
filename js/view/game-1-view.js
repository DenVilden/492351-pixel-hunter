import AbstractView from './abstract-view';
import statsTemplate from '../templates/stats-template';

export default class GameOneView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="468"
              height="458"
            />
            <label class="game__answer game__answer--photo">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="painting"
              />
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[1].image.url}"
              alt="Option 2"
              width="468"
              height="458"
            />
            <label class="game__answer  game__answer--photo">
              <input
                class="visually-hidden"
                name="question2"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input
                class="visually-hidden"
                name="question2"
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
    // Change screen if both inputs are checked
    gameAnswer.forEach(it => {
      it.addEventListener(`input`, () => {
        const radio = this.element.querySelectorAll(
          `.game__answer input:checked`
        );

        // Check if clicked element matches data
        if (radio.length === 2) {
          this.onAnswer(
            radio[0].value === this.data[this.state.level].answers[0].type &&
              radio[1].value === this.data[this.state.level].answers[1].type
          );
        }
      });
    });
  }

  onAnswer() {}
}
