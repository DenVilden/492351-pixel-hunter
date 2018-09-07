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
      <form class="game__content">
        <div class="game__option">
          <img src="${
  game[state.level].answers[0].src
}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${
  game[state.level].answers[1].src
}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${screenStats(state)}
    </section>
`;

export default (state) => {
  const gameOneScreen = render(template(state));

  const gameAnswer = gameOneScreen.querySelectorAll(`.game__answer input`);

  // Change screen if both inputs are checked
  gameAnswer.forEach((input) => {
    input.addEventListener(`input`, () => {
      const radio = gameOneScreen.querySelectorAll(
          `.game__answer input:checked`
      );

      if (radio.length === 2) {
        if (
          radio[0].value === game[state.level].answers[0].value && // Check if clicked element matches data
          radio[1].value === game[state.level].answers[1].value
        ) {
          selectSlide(screenTemplate(updateState(state)));
        } else {
          selectSlide(screenTemplate(updateState(state, 1, false))); // Remove one life if it doesn't
        }
      }
    });
  });

  const backButton = gameOneScreen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => selectSlide(greetingScreen()));

  return gameOneScreen;
};
