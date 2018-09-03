import {render, selectSlide} from "./util";
import screenHeader from "./screen-header";
import {data} from "./data/game-data";
import screenStats from "./screen-stats";

const screenTemplate = (level) => {
  const option1 = `
          <img src=${
  level[0].answers[0].src
} alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
  `;

  const option2 = `
          <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  `;

  const game = `
    ${screenHeader(data)}
    <section class="game">
      <p class="game__task">${level[0].question}</p>
      <form class="game__content">
        <div class="game__option">${option1}</div>
        <div class="game__option">${option1}</div>
      </form>
      ${screenStats}
    </section>
`;

  const gameI = render(game);

  return gameI;
};

export default screenTemplate;
