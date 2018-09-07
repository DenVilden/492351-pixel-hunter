import game from "./data/game";

const screenStats = (state) => `
      <ul class="stats">
        ${state.answers
          .map((it) => {
            if (it.completed) {
              return `<li class="stats__result stats__result--correct"></li>`;
            }

            if (!it.completed) {
              return `<li class="stats__result stats__result--wrong"></li>`;
            }

            return null;
          })
          .join(``)}
        ${new Array(game.length - state.answers.length)
          .fill(`<li class="stats__result stats__result--unknown"></li>`)
          .join(``)}
      </ul>
`;

export default screenStats;
