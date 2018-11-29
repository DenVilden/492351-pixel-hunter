import AbstractView from './abstract-view';
import statsTemplate from '../templates/stats-template';
import gameData from '../data/game-data';
import { getCorrectAnswers, getBonusAnswers } from '../util';
import BackButtonController from '../controller/back-button-controller';

const result = {
  fast: `Бонус за скорость`,
  alive: `Бонус за жизни`,
  slow: `Штраф за медлительность`
};

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.button = new BackButtonController();
  }

  get template() {
    return `
  <header class="header"></header>
  <section class="result"></section>
    `;
  }

  bind() {
    const header = this.element.querySelector(`.header`);
    header.appendChild(this.button.element);

    this._result = this.element.querySelector(`.result`);
  }

  showScores(scores) {
    this._result.innerHTML = `
      <h2 class="result__title">
        ${this.state.lives <= 0 ? `Поражение` : `Победа!`}
      </h2>
      <table class="result__table">
        ${scores
          .reverse()
          .map(
            (it, i) => `
    <tr>
      <td class="result__number">${i + 1}.</td>
      <td colspan="2">
        <ul class="stats">
          ${statsTemplate(it.stats)}
        </ul>
      </td>
      ${this.renderResult(it)}
    `
          )
          .join(``)}
      </table>
    `;
  }

  renderResult(it) {
    if (it.lives <= 0) {
      return `
      <td class="result__total"></td>
      <td class="result__total result__total--final">fail</td>
    </tr>
      `;
    }
    return `
      <td class="result__points">× ${gameData.SCORE.RIGHT_ANSWER}</td>
      <td class="result__total">${getCorrectAnswers(it.stats, `wrong`) *
        gameData.SCORE.RIGHT_ANSWER}</td>
    </tr>
    ${this.renderBonus(getBonusAnswers(it.stats, `fast`), `fast`)}
    ${this.renderBonus(it.lives, `alive`)}
    ${this.renderBonus(getBonusAnswers(it.stats, `slow`), `slow`)}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
        it.score
      }</td>
    </tr>

    `;
  }

  renderBonus(answer, type) {
    return `
      <tr>
        <td></td>
        <td class="result__extra">${result[type]}:</td>
        <td class="result__extra">
          ${answer} <span class="stats__result stats__result--${type}"></span>
        </td>
        <td class="result__points">× ${gameData.SCORE.BONUS_ANSWER}</td>
        <td class="result__total">${answer * gameData.SCORE.BONUS_ANSWER}</td>
      </tr>
    `;
  }
}
