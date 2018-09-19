import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";
import gameData from "../data/game-data";
import {getCorrectAnswers, getBonusAnswers} from "../util";
import BackButtonController from "../controller/back-button-controller";

export default class StatsView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.data = data;
    this.button = new BackButtonController();
  }

  get template() {
    if (this.state.lives <= 0) {
      return `
    <header class="header"></header>
    <section class="result">
      <table class="result__table">
        <tr>
          <td class="result__number"></td>
          <td>
            <ul class="stats">
              ${statsTemplate(this.state, this.data)}
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total result__total--final">fail</td>
        </tr>
      </table>
    </section>
      `;
    }

    return `
  <header class="header"></header>
  <section class="result">
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      <tr>
        <td class="result__number"></td>
        <td colspan="2">
          <ul class="stats">
            ${statsTemplate(this.state, this.data)}
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${getCorrectAnswers(
      this.state.answers,
      `wrong`
  ) * 100}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${getBonusAnswers(this.state.answers, `fast`)}
            <span class="stats__result stats__result--fast"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">${getBonusAnswers(
      this.state.answers,
      `fast`
  ) * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.state.lives}
            <span class="stats__result stats__result--alive"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">${this.state.lives * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${getBonusAnswers(this.state.answers, `slow`)}
            <span class="stats__result stats__result--slow"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">${getBonusAnswers(
      this.state.answers,
      `slow`
  )}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${gameData.calculateTotalScore(
      this.state.answers,
      this.state.lives
  )}</td>
      </tr>
    </table>
      `;
  }

  bind() {
    const header = this.element.querySelector(`.header`);
    header.appendChild(this.button.element);
  }
}
