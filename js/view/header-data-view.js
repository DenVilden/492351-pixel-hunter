import BackButtonView from "./back-button-view";
import backButtonTemplate from "../back-button-template";

export default class HeaderDataView extends BackButtonView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
  }

  get template() {
    return `
  <header class="header">
    ${backButtonTemplate}
    <div class="game__timer">${this.state.time}</div>
    <div class="game__lives">
      ${new Array(this.data.initialState.lives - this.state.lives)
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
