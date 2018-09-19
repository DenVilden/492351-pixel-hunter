import gameData from "../data/game-data";

const statsTemplate = (state, data) => `
  <ul class="stats">
    ${state.answers
      .map((it) => {
        if (it.completed === `wrong`) {
          return `<li class="stats__result stats__result--wrong"></li>`;
        }

        if (it.timeSpent >= gameData.SCORE.QUICK_ANSWER) {
          return `<li class="stats__result stats__result--fast"></li>`;
        }

        if (it.timeSpent <= gameData.SCORE.SLOW_ANSWER) {
          return `<li class="stats__result stats__result--slow"></li>`;
        }

        if (it.completed === `correct`) {
          return `<li class="stats__result stats__result--correct"></li>`;
        }

        return null;
      })
      .join(``)}
    ${new Array(data.length - state.answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

export default statsTemplate;
