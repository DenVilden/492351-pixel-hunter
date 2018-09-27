const statsTemplate = (state) => `
  <ul class="stats">
    ${state
      .map((it) => {
        if (it === `wrong`) {
          return `<li class="stats__result stats__result--wrong"></li>`;
        }

        if (it === `fast`) {
          return `<li class="stats__result stats__result--fast"></li>`;
        }

        if (it === `slow`) {
          return `<li class="stats__result stats__result--slow"></li>`;
        }

        if (it === `correct`) {
          return `<li class="stats__result stats__result--correct"></li>`;
        }

        return null;
      })
      .join(``)}
    ${new Array(10 - state.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

export default statsTemplate;
