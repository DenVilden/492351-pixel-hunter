import {render, selectSlide} from "./util";
import gameTwoScreen from "./game-2";
import greetingScreen from "./greeting";
import {data} from "./data/game-data";
import screenOption from "./screen-option";

const template = `
    <section class="game">
      <p class="game__task">${data.LEVEL.description}</p>
      <form class="game__content">${[...data].map}</form>

    </section>
`;

const gameOneScreen = render(template);

const gameAnswer = gameOneScreen.querySelectorAll(`.game__answer input`);
const backButton = gameOneScreen.querySelector(`.back`);

backButton.addEventListener(`click`, () => selectSlide(greetingScreen));

// Меняет экран если выбраны оба ответа
gameAnswer.forEach((input) => {
  input.addEventListener(`input`, () => {
    const radio = gameOneScreen.querySelectorAll(`.game__answer input:checked`);

    return radio.length === 2 ? selectSlide(gameTwoScreen) : null;
  });
});

export default gameOneScreen;
