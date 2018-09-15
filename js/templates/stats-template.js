import game from "../data/game";
import data from "../data/game-data";

const statsTemplate = (state) => `
  <ul class="stats">
    ${state.answers
      .map((it) => {
        if (!it.completed) {
          return `<li class="stats__result stats__result--wrong"></li>`;
        }

        if (it.timeSpent >= data.SCORE.QUICK_ANSWER) {
          return `<li class="stats__result stats__result--fast"></li>`;
        }

        if (it.timeSpent <= data.SCORE.SLOW_ANSWER) {
          return `<li class="stats__result stats__result--slow"></li>`;
        }

        if (it.completed) {
          return `<li class="stats__result stats__result--correct"></li>`;
        }

        return null;
      })
      .join(``)}
    ${new Array(game.length - state.answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

export default statsTemplate;
