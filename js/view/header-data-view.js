import BackButtonController from '../controller/back-button-controller';
import gameData from '../data/game-data';
import AbstractView from './abstract-view';

export default class HeaderDataView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.button = new BackButtonController();
  }

  get template() {
    return `
  <header class="header">
    <div class="game__timer">${this.state.time}</div>
    <div class="game__lives">
      ${new Array(gameData.initialState.lives - this.state.lives)
        .fill(
          `<img src="../img/heart__empty.svg" class="game__heart"
          alt=" Missed Life" width="31" height="27">`
        )
        .join(``)}
      ${new Array(this.state.lives)
        .fill(
          `<img src="../img/heart__full.svg" class="game__heart"
          alt="Life" width="31" height="27">`
        )
        .join(``)}
    </div>
  </header>
    `;
  }

  bind() {
    const timer = this.element.querySelector(`.game__timer`);
    if (this.state.time <= 5) {
      timer.style.color = `red`;
      setTimeout(() => {
        timer.style.color = `black`;
      }, 500); // half sec
    }
  }
}
