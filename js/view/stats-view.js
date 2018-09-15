import AbstractView from "./abstract-view";
import statsTemplate from "../templates/stats-template";
import data from "../data/game-data";

export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    if (this.state.lives <= 0) {
      return `
      <table class="result__table">
        <tr>
          <td class="result__number"></td>
          <td>
            <ul class="stats">
              ${statsTemplate(this.state)}
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
  <section class="result">
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      <tr>
        <td class="result__number"></td>
        <td colspan="2">
          <ul class="stats">
            ${statsTemplate(this.state)}
          </ul>
        </td>
        <td class="result__points">×${data.SCORE.RIGHT_ANSWER}</td>
        <td class="result__total"></td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.state.lives}
            <span class="stats__result stats__result--fast"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">${this.state.lives *
          data.SCORE.BONUS_ANSWER} </td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2
            <span class="stats__result stats__result--alive"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2
            <span class="stats__result stats__result--slow"></span>
        </td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${data.calculateScore(
      this.state.answers,
      this.state.lives
  )}</td>
      </tr>
    </table>
      `;
  }
}
