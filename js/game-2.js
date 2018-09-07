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
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${
  game[state.level].answers[0].src
}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${screenStats(state)}
    </section>
`;

export default (state) => {
  const gameTwoScreen = render(template(state));

  const gameAnswer = gameTwoScreen.querySelectorAll(`.game__answer input`);

  gameAnswer.forEach((input) => {
    input.addEventListener(`input`, (evt) => {
      if (evt.target.value === game[state.level].answers[0].value) {
        selectSlide(screenTemplate(updateState(state)));
      } else {
        selectSlide(screenTemplate(updateState(state, 1, false)));
      }
    });
  });

  const backButton = gameTwoScreen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => selectSlide(greetingScreen()));

  return gameTwoScreen;
};
