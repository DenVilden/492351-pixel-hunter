import BackButtonView from "./back-button-view";
import backButtonTemplate from "../templates/back-button-template";
import data from "../data/game-data";

export default class HeaderDataView extends BackButtonView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
  <header class="header">
    ${backButtonTemplate}
    <div class="game__timer">${this.state.time}</div>
    <div class="game__lives">
      ${new Array(data.initialState.lives - this.state.lives)
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
}
