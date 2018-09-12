import AbstractView from "./abstract-view";
import backButtonTemplate from "../back-button-template";

export default class BackButtonView extends AbstractView {
  get template() {
    return `
    <header class="header">
      ${backButtonTemplate}
    </header>
    `;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => this.onClick());
  }

  onClick() {}
}
