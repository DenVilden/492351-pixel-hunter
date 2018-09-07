import {render, selectSlide} from "./util";
import greetingScreen from "./greeting";
import game from "./data/game";
import screenHeaderButton from "./screen-header-button";
import screenHeaderData from "./screen-header-data";
import screenStats from "./screen-stats";
import {screenTemplate, updateState} from "./screen";

const template = (state) => `
    <header class="header">
      ${screenHeaderButton}
      ${screenHeaderData(state)}
    </header>
    <section class="game">
      <p class="game__task">${game[state.level].question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${
  game[state.level].answers[0].src
}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${
  game[state.level].answers[1].src
}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${
  game[state.level].answers[2].src
}" alt="Option 3" width="304" height="455">
        </div>
      </form>
      ${screenStats(state)}
    </section>
`;

export default (state) => {
  const gameThreeScreen = render(template(state));

  const gameOption = gameThreeScreen.querySelectorAll(`.game__option`);

  gameOption.forEach((input) => {
    input.addEventListener(`click`, (evt) => {
      if (evt.target.src === game[state.level].answers[2].src) {
        selectSlide(screenTemplate(updateState(state)));
      } else {
        selectSlide(screenTemplate(updateState(state, 1, false)));
      }
    });
  });

  const backButton = gameThreeScreen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => selectSlide(greetingScreen()));

  return gameThreeScreen;
};
