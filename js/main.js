(function () {
  'use strict';

  const mainElement = document.querySelector(`#main`);

  const renderTemplate = (template = ``) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const changeView = view => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(view.element);
  };

  const renderGame = (element1, element2) => {
    const root = document.createElement(`div`);
    root.appendChild(element1.element);
    root.appendChild(element2.element);
    return root;
  };

  const checkIfElementExist = (array, answer, url) => {
    const question = [];

    for (const iterator of array) {
      if (iterator.type === answer) {
        question.push(iterator);
      }
    }

    return question[0].image.url === url;
  };

  const getCorrectAnswers = (array, answer) => {
    let index = 0;
    for (let element of array) {
      if (element !== answer) {
        index++;
      }
    }
    return index;
  };

  const getBonusAnswers = (array, answer) => {
    let index = 0;
    for (let element of array) {
      if (element === answer) {
        index++;
      }
    }
    return index;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    render() {
      return renderTemplate(this.template);
    }

    bind() {} // bind handlers if required

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }
  }

  class IntroView extends AbstractView {
    get template() {
      return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button">
          <span class="visually-hidden">Продолжить</span>*
        </button>
        <p class="intro__motto">
          <sup>*</sup> Это не фото. Это рисунок маслом нидерландского
          художника-фотореалиста Tjalf Sparnaay.
        </p>
      </section>
    `;
    }

    bind() {
      const startGame = this.element.querySelector(`.intro__asterisk`);
      startGame.addEventListener(`click`, () => this.onClick());
    }

    onClick() {}
  }

  class IntroController {
    constructor() {
      this.introScreen = new IntroView();
      this.introScreen.onClick = () => Router.showGreeting();
    }

    get element() {
      return this.introScreen.element;
    }
  }

  class GreetingView extends AbstractView {
    get template() {
      return `
      <section class="greeting central--blur">
        <img
          class="greeting__logo"
          src="img/logo_ph-big.svg"
          width="201"
          height="89"
          alt="Pixel Hunter"
        />
        <div class="greeting__asterisk asterisk">
          <span class="visually-hidden">Я просто красивая звёздочка</span>*
        </div>
        <div class="greeting__challenge">
          <h3 class="greeting__challenge-title">
            Лучшие художники-фотореалисты бросают тебе вызов!
          </h3>
          <p class="greeting__challenge-text">Правила игры просты:</p>
          <ul class="greeting__challenge-list">
            <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
            <li>
              Задача кажется тривиальной, но не думай, что все так просто.
            </li>
            <li>Фотореализм обманчив и коварен.</li>
            <li>Помни, главное — смотреть очень внимательно.</li>
          </ul>
        </div>
        <button class="greeting__continue" type="button">
          <span class="visually-hidden">Продолжить</span>
          <svg
            class="icon"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="#000000"
          >
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      </section>
    `;
    }

    bind() {
      const greetingContinue = this.element.querySelector(`.greeting__continue`);
      greetingContinue.addEventListener(`click`, () => this.onClick());
    }

    onClick() {}
  }

  class GreetingController {
    constructor() {
      this.greetingScreen = new GreetingView();
      this.greetingScreen.onClick = () => Router.showRules();
    }

    get element() {
      return this.greetingScreen.element;
    }
  }

  class BackButtonView extends AbstractView {
    get template() {
      return `
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg
          class="icon"
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="#000000"
        >
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg
          class="icon"
          width="101"
          height="44"
          viewBox="0 0 101 44"
          fill="#000000"
        >
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    `;
    }

    bind() {
      const backButton = this.element.querySelector(`.back`);
      backButton.addEventListener(`click`, () => this.onClick());
    }

    onClick() {}
  }

  class BackButtonController {
    constructor() {
      this.backButton = new BackButtonView();
      this.backButton.onClick = () => Router.showGreeting();
    }

    get element() {
      return this.backButton.element;
    }
  }

  class RulesView extends AbstractView {
    constructor() {
      super();
      this.button = new BackButtonController();
    }

    get template() {
      return `
      <header class="header"></header>
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>
            Угадай 10 раз для каждого изображения фото
            <img
              class="rules__icon"
              src="img/icon-photo.png"
              width="32"
              height="31"
              alt="Фото"
            />
            или рисунок
            <img
              class="rules__icon"
              src="img/icon-paint.png"
              width="32"
              height="31"
              alt="Рисунок"
            />
          </li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя" />
          <button class="rules__button  continue" type="submit" disabled>
            Go!
          </button>
        </form>
      </section>
    `;
    }

    bind() {
      const header = this.element.querySelector(`.header`);
      header.appendChild(this.button.element);

      const rulesInput = this.element.querySelector(`.rules__input`);
      const rulesButton = this.element.querySelector(`.rules__button`);

      // Disable button if input is empty
      rulesInput.addEventListener(`input`, evt => {
        rulesButton.disabled = evt.target.value.length === 0;
      });

      rulesButton.addEventListener(`click`, () => this.onClick(rulesInput.value));
    }

    onClick() {}
  }

  class RulesController {
    constructor() {
      this.rulesScreen = new RulesView();
      this.rulesScreen.onClick = playerName => Router.showData(playerName);
    }

    get element() {
      return this.rulesScreen.element;
    }
  }

  const gameData = {
    initialState: {
      level: 0,
      lives: 3,
      time: 30,
      answers: []
    },

    SCORE: {
      RIGHT_ANSWER: 100,
      BONUS_ANSWER: 50,
      ONE_LIFE_SCORE: 50,
      QUICK_ANSWER: 20, // sec
      SLOW_ANSWER: 10
    },

    getAnswer(timeSpent, completed) {
      if (completed === false) {
        return `wrong`;
      }

      if (timeSpent >= this.SCORE.QUICK_ANSWER) {
        return `fast`;
      }

      if (timeSpent <= this.SCORE.SLOW_ANSWER) {
        return `slow`;
      }

      if (completed === true) {
        return `correct`;
      }
      return null;
    },

    calculateTotalScore(answers, lives) {
      return answers.reduce((score, it) => {
        if (it.completed !== `wrong`) {
          score += this.SCORE.RIGHT_ANSWER;
        }

        if (it.completed === `fast`) {
          score += this.SCORE.BONUS_ANSWER;
        }

        if (it.completed === `slow`) {
          score -= this.SCORE.BONUS_ANSWER;
        }

        return score;
      }, lives * this.SCORE.ONE_LIFE_SCORE);
    },

    changeLevel(state) {
      return Object.assign({}, state, {
        level: state.level + 1,
        time: this.initialState.time
      });
    },

    setLives(state) {
      return Object.assign({}, state, {
        lives: state.lives - 1
      });
    },

    pushAnswer(answers, completed, timeSpent) {
      return answers.concat(this.getAnswer(timeSpent, completed));
    },

    addAnswer(state, completed, timeSpent) {
      return Object.assign({}, state, {
        answers: this.pushAnswer(state.answers, completed, timeSpent)
      });
    },

    tick(state) {
      return Object.assign({}, state, {
        time: state.time - 1
      });
    },

    getFinalStats(state) {
      return {
        stats: state.answers,
        lives: state.lives,
        score: this.calculateTotalScore(state.answers, state.lives)
      };
    }
  };

  class HeaderDataView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
      this.button = new BackButtonController();
    }

    get template() {
      return `
      <header class="header">
        <div class="game__timer">${this.state.time}</div>
        <div class="game__lives">
          ${new Array(gameData.initialState.lives - this.state.lives)
            .fill(
              `<img src="../img/heart__empty.svg" class="game__heart"
          alt=" Missed Life" width="31" height="27">`
            )
            .join(``)}
          ${new Array(this.state.lives)
            .fill(
              `<img src="../img/heart__full.svg" class="game__heart"
          alt="Life" width="31" height="27">`
            )
            .join(``)}
        </div>
      </header>
    `;
    }

    bind() {
      const timer = this.element.querySelector(`.game__timer`);
      if (this.state.time <= 5) {
        timer.style.color = `red`;
        setTimeout(() => {
          timer.style.color = `black`;
        }, 500); // half sec
      }
    }
  }

  const statsTemplate = state => `
  <ul class="stats">
    ${state
      .map(it => {
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

  class GameOneView extends AbstractView {
    constructor(state, data) {
      super();
      this.state = state;
      this.data = data;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="468"
              height="458"
            />
            <label class="game__answer game__answer--photo">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="painting"
              />
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[1].image.url}"
              alt="Option 2"
              width="468"
              height="458"
            />
            <label class="game__answer  game__answer--photo">
              <input
                class="visually-hidden"
                name="question2"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input
                class="visually-hidden"
                name="question2"
                type="radio"
                value="painting"
              />
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        ${statsTemplate(this.state.answers)}
      </section>
    `;
    }

    bind() {
      const gameAnswer = this.element.querySelectorAll(`.game__answer input`);
      // Change screen if both inputs are checked
      gameAnswer.forEach(it => {
        it.addEventListener(`input`, () => {
          const radio = this.element.querySelectorAll(
            `.game__answer input:checked`
          );

          // Check if clicked element matches data
          if (radio.length === 2) {
            this.onAnswer(
              radio[0].value === this.data[this.state.level].answers[0].type &&
                radio[1].value === this.data[this.state.level].answers[1].type
            );
          }
        });
      });
    }

    onAnswer() {}
  }

  class GameTwoView extends AbstractView {
    constructor(state, data) {
      super();
      this.state = state;
      this.data = data;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="705"
              height="455"
            />
            <label class="game__answer  game__answer--photo">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="photo"
              />
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input
                class="visually-hidden"
                name="question1"
                type="radio"
                value="painting"
              />
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        ${statsTemplate(this.state.answers)}
      </section>
    `;
    }

    bind() {
      const gameAnswer = this.element.querySelectorAll(`.game__answer input`);

      gameAnswer.forEach(it => {
        it.addEventListener(`input`, evt => {
          this.onAnswer(
            evt.target.value === this.data[this.state.level].answers[0].type
          );
        });
      });
    }

    onAnswer() {}
  }

  class GameThreeView extends AbstractView {
    constructor(state, data) {
      super();
      this.state = state;
      this.data = data;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.data[this.state.level].question}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[0].image.url}"
              alt="Option 1"
              width="304"
              height="455"
            />
          </div>
          <div class="game__option  game__option--selected">
            <img
              src="${this.data[this.state.level].answers[1].image.url}"
              alt="Option 2"
              width="304"
              height="455"
            />
          </div>
          <div class="game__option">
            <img
              src="${this.data[this.state.level].answers[2].image.url}"
              alt="Option 3"
              width="304"
              height="455"
            />
          </div>
        </form>
        ${statsTemplate(this.state.answers)}
      </section>
    `;
    }

    bind() {
      const gameAnswer = this.element.querySelectorAll(`.game__option`);
      const isRight = this.element.querySelector(`.game__task`);

      const getBonusAnswers$$1 = evt => {
        if (isRight.textContent === `Найдите фото среди изображений`) {
          return checkIfElementExist(
            this.data[this.state.level].answers,
            `photo`,
            evt.target.src
          );
        }

        return isRight.textContent === `Найдите рисунок среди изображений`
          ? checkIfElementExist(
              this.data[this.state.level].answers,
              `painting`,
              evt.target.src
            )
          : null;
      };

      gameAnswer.forEach(it => {
        it.addEventListener(`click`, evt => this.onAnswer(getBonusAnswers$$1(evt)));
      });
    }

    onAnswer() {}
  }

  class GameController {
    constructor(model) {
      this.model = model;
      this.screen = this.initGame(
        this.model.state,
        this.model.data,
        this.model.getCurrentLevel()
      );
      this.headerData = new HeaderDataView(this.model.state);
      this.backButton = new BackButtonController();

      this.updateHeader();

      this.root = renderGame(this.headerData, this.screen);

      this.screen.onAnswer = this.answer.bind(this);

      this._interval = null;
      this.startTimer();
    }

    get element() {
      return this.root;
    }

    initGame(state, data, level) {
      if (level.type === `two-of-two`) {
        return new GameOneView(state, data);
      }

      if (level.type === `tinder-like`) {
        return new GameTwoView(state, data);
      }

      if (level.type === `one-of-three`) {
        return new GameThreeView(state, data);
      }

      return null;
    }

    stopTimer() {
      clearInterval(this._interval);
    }

    startTimer() {
      this._interval = setInterval(() => {
        this.model.tick();
        this.updateHeader();

        if (this.model.hasTime()) {
          this.stopTimer();
          this.model.setLives();
          this.model.addAnswer();
          this.continueGame();
        }
      }, 1000); // 1 sec
    }

    answer(answer) {
      this.stopTimer();
      if (!answer) {
        this.model.setLives();
      }
      this.model.addAnswer(answer);
      this.continueGame();
    }

    continueGame() {
      if (this.model.die()) {
        this.endGame();
      } else {
        this.changeGame();
      }
    }

    endGame() {
      const result = this.model.updateScore(this.model.state);
      Router.showResult(result, this.model.playerName);
    }

    changeGame() {
      this.model.changeLevel();
      Router.showGame(this.model);
    }

    updateHeader() {
      const header = new HeaderDataView(this.model.state);
      this.headerData.element.replaceWith(header.element);
      this.headerData = header;
      header.element.querySelector(`header`).prepend(this.backButton.element);
    }
  }

  class ErrorView extends AbstractView {
    get template() {
      return `
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">
            Статус: 404. Пожалуйста, перезагрузите страницу.
          </p>
        </div>
      </section>
    `;
    }
  }

  class GameModel {
    constructor(playerName, data) {
      this.data = data;
      this.playerName = playerName;
      this.restart();
    }

    get state() {
      return Object.freeze(this._state);
    }

    die() {
      return this.hasNextLevel() || this.hasLives();
    }

    hasNextLevel() {
      return this.getLevel(this._state.level + 1) === undefined;
    }

    changeLevel() {
      this._state = gameData.changeLevel(this._state);
    }

    getLevel(state) {
      return this.data[state];
    }

    setLives() {
      this._state = gameData.setLives(this._state);
    }

    addAnswer(completed = false) {
      this._state = gameData.addAnswer(this._state, completed, this._state.time);
    }

    restart() {
      this._state = gameData.initialState;
    }

    hasLives() {
      return this._state.lives <= 0;
    }

    hasTime() {
      return this._state.time <= 0;
    }

    getCurrentLevel() {
      return this.getLevel(this._state.level);
    }

    tick() {
      this._state = gameData.tick(this._state);
    }

    updateScore(model) {
      return gameData.getFinalStats(model);
    }
  }

  const result = {
    fast: `Бонус за скорость`,
    alive: `Бонус за жизни`,
    slow: `Штраф за медлительность`
  };

  class ResultView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
      this.button = new BackButtonController();
    }

    get template() {
      return `
  <header class="header"></header>
  <section class="result"></section>
    `;
    }

    bind() {
      const header = this.element.querySelector(`.header`);
      header.appendChild(this.button.element);

      this._result = this.element.querySelector(`.result`);
    }

    showScores(scores) {
      this._result.innerHTML = `
      <h2 class="result__title">
        ${this.state.lives <= 0 ? `Поражение` : `Победа!`}
      </h2>
      <table class="result__table">
        ${scores
          .reverse()
          .map(
            (it, i) => `
    <tr>
      <td class="result__number">${i + 1}.</td>
      <td colspan="2">
        <ul class="stats">
          ${statsTemplate(it.stats)}
        </ul>
      </td>
      ${this.renderResult(it)}
    `
          )
          .join(``)}
      </table>
    `;
    }

    renderResult(it) {
      if (it.lives <= 0) {
        return `
      <td class="result__total"></td>
      <td class="result__total result__total--final">fail</td>
    </tr>
      `;
      }
      return `
      <td class="result__points">× ${gameData.SCORE.RIGHT_ANSWER}</td>
      <td class="result__total">${getCorrectAnswers(it.stats, `wrong`) *
        gameData.SCORE.RIGHT_ANSWER}</td>
    </tr>
    ${this.renderBonus(getBonusAnswers(it.stats, `fast`), `fast`)}
    ${this.renderBonus(it.lives, `alive`)}
    ${this.renderBonus(getBonusAnswers(it.stats, `slow`), `slow`)}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${
        it.score
      }</td>
    </tr>

    `;
    }

    renderBonus(answer, type) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">${result[type]}:</td>
        <td class="result__extra">
          ${answer} <span class="stats__result stats__result--${type}"></span>
        </td>
        <td class="result__points">× ${gameData.SCORE.BONUS_ANSWER}</td>
        <td class="result__total">${answer * gameData.SCORE.BONUS_ANSWER}</td>
      </tr>
    `;
    }
  }

  const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

  const DEFAULT_NAME = `Kappa`;
  const APP_ID = 3751463022;

  const checkStatus = response => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  const toJSON = res => res.json();

  class Loader {
    static async loadData() {
      const response = await fetch(`${SERVER_URL}/questions`);
      const res = await checkStatus(response);
      return toJSON(res);
    }

    static async loadResults(name = DEFAULT_NAME) {
      const response = await fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`);
      const res = await checkStatus(response);
      return toJSON(res);
    }

    static async saveResults(data, name = DEFAULT_NAME) {
      data = Object.assign({ name }, data);
      const requestSettings = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };
      const response = await fetch(
        `${SERVER_URL}/stats/:${APP_ID}-:${name}`,
        requestSettings
      );
      return checkStatus(response);
    }
  }

  let gameData$1;

  class Router {
    static init() {
      Loader.loadData()
        .then(data => (gameData$1 = data))
        .then(() => Router.showIntro())
        .catch(Router.showError);
    }

    static showIntro() {
      const intro = new IntroController();
      changeView(intro);
    }

    static showGreeting() {
      const greeting = new GreetingController();
      changeView(greeting);
    }

    static showRules() {
      const rules = new RulesController();
      changeView(rules);
    }

    static showData(playerName) {
      Router.showGame(new GameModel(playerName, gameData$1));
    }

    static showGame(model) {
      const game = new GameController(model);
      changeView(game);
    }

    static showResult(state, playerName) {
      const result = new ResultView(state);
      changeView(result);

      Loader.saveResults(state, playerName)
        .then(() => Loader.loadResults(playerName))
        .then(data => result.showScores(data))
        .catch(Router.showError);
    }

    static showError() {
      const error = new ErrorView();
      changeView(error);
    }
  }

  const init = () => {
    Router.init();
  };

  init();

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsianMvdXRpbC5qcyIsImpzL3ZpZXcvYWJzdHJhY3Qtdmlldy5qcyIsImpzL3ZpZXcvaW50cm8tdmlldy5qcyIsImpzL2NvbnRyb2xsZXIvaW50cm8tY29udHJvbGxlci5qcyIsImpzL3ZpZXcvZ3JlZXRpbmctdmlldy5qcyIsImpzL2NvbnRyb2xsZXIvZ3JlZXRpbmctY29udHJvbGxlci5qcyIsImpzL3ZpZXcvYmFjay1idXR0b24tdmlldy5qcyIsImpzL2NvbnRyb2xsZXIvYmFjay1idXR0b24tY29udHJvbGxlci5qcyIsImpzL3ZpZXcvcnVsZXMtdmlldy5qcyIsImpzL2NvbnRyb2xsZXIvcnVsZXMtY29udHJvbGxlci5qcyIsImpzL2RhdGEvZ2FtZS1kYXRhLmpzIiwianMvdmlldy9oZWFkZXItZGF0YS12aWV3LmpzIiwianMvdGVtcGxhdGVzL3N0YXRzLXRlbXBsYXRlLmpzIiwianMvdmlldy9nYW1lLTEtdmlldy5qcyIsImpzL3ZpZXcvZ2FtZS0yLXZpZXcuanMiLCJqcy92aWV3L2dhbWUtMy12aWV3LmpzIiwianMvY29udHJvbGxlci9nYW1lLWNvbnRyb2xsZXIuanMiLCJqcy92aWV3L2Vycm9yLXZpZXcuanMiLCJqcy9nYW1lLW1vZGVsLmpzIiwianMvdmlldy9yZXN1bHQtdmlldy5qcyIsImpzL2xvYWRlci5qcyIsImpzL3JvdXRlci5qcyIsImpzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbmApO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGUgPSAodGVtcGxhdGUgPSBgYCkgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gIHdyYXBwZXIuaW5uZXJIVE1MID0gdGVtcGxhdGUudHJpbSgpO1xuICByZXR1cm4gd3JhcHBlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaWV3ID0gdmlldyA9PiB7XG4gIG1haW5FbGVtZW50LmlubmVySFRNTCA9IGBgO1xuICBtYWluRWxlbWVudC5hcHBlbmRDaGlsZCh2aWV3LmVsZW1lbnQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckdhbWUgPSAoZWxlbWVudDEsIGVsZW1lbnQyKSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgcm9vdC5hcHBlbmRDaGlsZChlbGVtZW50MS5lbGVtZW50KTtcbiAgcm9vdC5hcHBlbmRDaGlsZChlbGVtZW50Mi5lbGVtZW50KTtcbiAgcmV0dXJuIHJvb3Q7XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tJZkVsZW1lbnRFeGlzdCA9IChhcnJheSwgYW5zd2VyLCB1cmwpID0+IHtcbiAgY29uc3QgcXVlc3Rpb24gPSBbXTtcblxuICBmb3IgKGNvbnN0IGl0ZXJhdG9yIG9mIGFycmF5KSB7XG4gICAgaWYgKGl0ZXJhdG9yLnR5cGUgPT09IGFuc3dlcikge1xuICAgICAgcXVlc3Rpb24ucHVzaChpdGVyYXRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHF1ZXN0aW9uWzBdLmltYWdlLnVybCA9PT0gdXJsO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENvcnJlY3RBbnN3ZXJzID0gKGFycmF5LCBhbnN3ZXIpID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgZm9yIChsZXQgZWxlbWVudCBvZiBhcnJheSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBhbnN3ZXIpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCb251c0Fuc3dlcnMgPSAoYXJyYXksIGFuc3dlcikgPT4ge1xuICBsZXQgaW5kZXggPSAwO1xuICBmb3IgKGxldCBlbGVtZW50IG9mIGFycmF5KSB7XG4gICAgaWYgKGVsZW1lbnQgPT09IGFuc3dlcikge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufTtcbiIsImltcG9ydCB7IHJlbmRlclRlbXBsYXRlIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChuZXcudGFyZ2V0ID09PSBBYnN0cmFjdFZpZXcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaW5zdGFudGlhdGUgQWJzdHJhY3RWaWV3LCBvbmx5IGNvbmNyZXRlIG9uZWApO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbXBsYXRlIGlzIHJlcXVpcmVkYCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHJlbmRlclRlbXBsYXRlKHRoaXMudGVtcGxhdGUpO1xuICB9XG5cbiAgYmluZCgpIHt9IC8vIGJpbmQgaGFuZGxlcnMgaWYgcmVxdWlyZWRcblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuYmluZCh0aGlzLl9lbGVtZW50KTtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRyb1ZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiaW50cm9cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImludHJvX19hc3RlcmlzayBhc3Rlcmlza1wiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCf0YDQvtC00L7Qu9C20LjRgtGMPC9zcGFuPipcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxwIGNsYXNzPVwiaW50cm9fX21vdHRvXCI+XG4gICAgICAgICAgPHN1cD4qPC9zdXA+INCt0YLQviDQvdC1INGE0L7RgtC+LiDQrdGC0L4g0YDQuNGB0YPQvdC+0Log0LzQsNGB0LvQvtC8INC90LjQtNC10YDQu9Cw0L3QtNGB0LrQvtCz0L5cbiAgICAgICAgICDRhdGD0LTQvtC20L3QuNC60LAt0YTQvtGC0L7RgNC10LDQu9C40YHRgtCwIFRqYWxmIFNwYXJuYWF5LlxuICAgICAgICA8L3A+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3Qgc3RhcnRHYW1lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pbnRyb19fYXN0ZXJpc2tgKTtcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB0aGlzLm9uQ2xpY2soKSk7XG4gIH1cblxuICBvbkNsaWNrKCkge31cbn1cbiIsImltcG9ydCBJbnRyb1ZpZXcgZnJvbSAnLi4vdmlldy9pbnRyby12aWV3JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vcm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9Db250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbnRyb1NjcmVlbiA9IG5ldyBJbnRyb1ZpZXcoKTtcbiAgICB0aGlzLmludHJvU2NyZWVuLm9uQ2xpY2sgPSAoKSA9PiBSb3V0ZXIuc2hvd0dyZWV0aW5nKCk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRyb1NjcmVlbi5lbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyZWV0aW5nVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJncmVldGluZyBjZW50cmFsLS1ibHVyXCI+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzcz1cImdyZWV0aW5nX19sb2dvXCJcbiAgICAgICAgICBzcmM9XCJpbWcvbG9nb19waC1iaWcuc3ZnXCJcbiAgICAgICAgICB3aWR0aD1cIjIwMVwiXG4gICAgICAgICAgaGVpZ2h0PVwiODlcIlxuICAgICAgICAgIGFsdD1cIlBpeGVsIEh1bnRlclwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmVldGluZ19fYXN0ZXJpc2sgYXN0ZXJpc2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCvINC/0YDQvtGB0YLQviDQutGA0LDRgdC40LLQsNGPINC30LLRkdC30LTQvtGH0LrQsDwvc3Bhbj4qXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JlZXRpbmdfX2NoYWxsZW5nZVwiPlxuICAgICAgICAgIDxoMyBjbGFzcz1cImdyZWV0aW5nX19jaGFsbGVuZ2UtdGl0bGVcIj5cbiAgICAgICAgICAgINCb0YPRh9GI0LjQtSDRhdGD0LTQvtC20L3QuNC60Lgt0YTQvtGC0L7RgNC10LDQu9C40YHRgtGLINCx0YDQvtGB0LDRjtGCINGC0LXQsdC1INCy0YvQt9C+0LIhXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8cCBjbGFzcz1cImdyZWV0aW5nX19jaGFsbGVuZ2UtdGV4dFwiPtCf0YDQsNCy0LjQu9CwINC40LPRgNGLINC/0YDQvtGB0YLRizo8L3A+XG4gICAgICAgICAgPHVsIGNsYXNzPVwiZ3JlZXRpbmdfX2NoYWxsZW5nZS1saXN0XCI+XG4gICAgICAgICAgICA8bGk+0J3Rg9C20L3QviDQvtGC0LvQuNGH0LjRgtGMINGA0LjRgdGD0L3QvtC6INC+0YIg0YTQvtGC0L7Qs9GA0LDRhNC40Lgg0Lgg0YHQtNC10LvQsNGC0Ywg0LLRi9Cx0L7RgC48L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICDQl9Cw0LTQsNGH0LAg0LrQsNC20LXRgtGB0Y8g0YLRgNC40LLQuNCw0LvRjNC90L7QuSwg0L3QviDQvdC1INC00YPQvNCw0LksINGH0YLQviDQstGB0LUg0YLQsNC6INC/0YDQvtGB0YLQvi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+0KTQvtGC0L7RgNC10LDQu9C40LfQvCDQvtCx0LzQsNC90YfQuNCyINC4INC60L7QstCw0YDQtdC9LjwvbGk+XG4gICAgICAgICAgICA8bGk+0J/QvtC80L3QuCwg0LPQu9Cw0LLQvdC+0LUg4oCUINGB0LzQvtGC0YDQtdGC0Ywg0L7Rh9C10L3RjCDQstC90LjQvNCw0YLQtdC70YzQvdC+LjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJncmVldGluZ19fY29udGludWVcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7Qn9GA0L7QtNC+0LvQttC40YLRjDwvc3Bhbj5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBjbGFzcz1cImljb25cIlxuICAgICAgICAgICAgd2lkdGg9XCI2NFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCI2NFwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDY0IDY0XCJcbiAgICAgICAgICAgIGZpbGw9XCIjMDAwMDAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNhcnJvdy1yaWdodFwiPjwvdXNlPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBncmVldGluZ0NvbnRpbnVlID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmVldGluZ19fY29udGludWVgKTtcbiAgICBncmVldGluZ0NvbnRpbnVlLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKCkgPT4gdGhpcy5vbkNsaWNrKCkpO1xuICB9XG5cbiAgb25DbGljaygpIHt9XG59XG4iLCJpbXBvcnQgR3JlZXRpbmdWaWV3IGZyb20gJy4uL3ZpZXcvZ3JlZXRpbmctdmlldyc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4uL3JvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyZWV0aW5nQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JlZXRpbmdTY3JlZW4gPSBuZXcgR3JlZXRpbmdWaWV3KCk7XG4gICAgdGhpcy5ncmVldGluZ1NjcmVlbi5vbkNsaWNrID0gKCkgPT4gUm91dGVyLnNob3dSdWxlcygpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JlZXRpbmdTY3JlZW4uZWxlbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrQnV0dG9uVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJhY2tcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QktC10YDQvdGD0YLRjNGB0Y8g0Log0L3QsNGH0LDQu9GDPC9zcGFuPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgY2xhc3M9XCJpY29uXCJcbiAgICAgICAgICB3aWR0aD1cIjQ1XCJcbiAgICAgICAgICBoZWlnaHQ9XCI0NVwiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCA0NSA0NVwiXG4gICAgICAgICAgZmlsbD1cIiMwMDAwMDBcIlxuICAgICAgICA+XG4gICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjYXJyb3ctbGVmdFwiPjwvdXNlPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIGNsYXNzPVwiaWNvblwiXG4gICAgICAgICAgd2lkdGg9XCIxMDFcIlxuICAgICAgICAgIGhlaWdodD1cIjQ0XCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDEwMSA0NFwiXG4gICAgICAgICAgZmlsbD1cIiMwMDAwMDBcIlxuICAgICAgICA+XG4gICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjbG9nby1zbWFsbFwiPjwvdXNlPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmJhY2tgKTtcbiAgICBiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKCkgPT4gdGhpcy5vbkNsaWNrKCkpO1xuICB9XG5cbiAgb25DbGljaygpIHt9XG59XG4iLCJpbXBvcnQgUm91dGVyIGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQgQmFja0J1dHRvblZpZXcgZnJvbSAnLi4vdmlldy9iYWNrLWJ1dHRvbi12aWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja0J1dHRvbkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSBuZXcgQmFja0J1dHRvblZpZXcoKTtcbiAgICB0aGlzLmJhY2tCdXR0b24ub25DbGljayA9ICgpID0+IFJvdXRlci5zaG93R3JlZXRpbmcoKTtcbiAgfVxuXG4gIGdldCBlbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmJhY2tCdXR0b24uZWxlbWVudDtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuaW1wb3J0IEJhY2tCdXR0b25Db250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXIvYmFjay1idXR0b24tY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVzVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgQmFja0J1dHRvbkNvbnRyb2xsZXIoKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlclwiPjwvaGVhZGVyPlxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJydWxlc1wiPlxuICAgICAgICA8aDIgY2xhc3M9XCJydWxlc19fdGl0bGVcIj7Qn9GA0LDQstC40LvQsDwvaDI+XG4gICAgICAgIDx1bCBjbGFzcz1cInJ1bGVzX19kZXNjcmlwdGlvblwiPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgINCj0LPQsNC00LDQuSAxMCDRgNCw0Lcg0LTQu9GPINC60LDQttC00L7Qs9C+INC40LfQvtCx0YDQsNC20LXQvdC40Y8g0YTQvtGC0L5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgY2xhc3M9XCJydWxlc19faWNvblwiXG4gICAgICAgICAgICAgIHNyYz1cImltZy9pY29uLXBob3RvLnBuZ1wiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMzJcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMVwiXG4gICAgICAgICAgICAgIGFsdD1cItCk0L7RgtC+XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICDQuNC70Lgg0YDQuNGB0YPQvdC+0LpcbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgY2xhc3M9XCJydWxlc19faWNvblwiXG4gICAgICAgICAgICAgIHNyYz1cImltZy9pY29uLXBhaW50LnBuZ1wiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMzJcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMVwiXG4gICAgICAgICAgICAgIGFsdD1cItCg0LjRgdGD0L3QvtC6XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGk+0KTQvtGC0L7Qs9GA0LDRhNC40Y/QvNC4INC40LvQuCDRgNC40YHRg9C90LrQsNC80Lgg0LzQvtCz0YPRgiDQsdGL0YLRjCDQvtCx0LAg0LjQt9C+0LHRgNCw0LbQtdC90LjRjy48L2xpPlxuICAgICAgICAgIDxsaT7QndCwINC60LDQttC00YPRjiDQv9C+0L/Ri9GC0LrRgyDQvtGC0LLQvtC00LjRgtGB0Y8gMzAg0YHQtdC60YPQvdC0LjwvbGk+XG4gICAgICAgICAgPGxpPtCe0YjQuNCx0LjRgtGM0YHRjyDQvNC+0LbQvdC+INC90LUg0LHQvtC70LXQtSAzINGA0LDQty48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8cCBjbGFzcz1cInJ1bGVzX19yZWFkeVwiPtCT0L7RgtC+0LLRiz88L3A+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwicnVsZXNfX2Zvcm1cIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJydWxlc19faW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi0JLQsNGI0LUg0JjQvNGPXCIgLz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicnVsZXNfX2J1dHRvbiAgY29udGludWVcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ+XG4gICAgICAgICAgICBHbyFcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuaGVhZGVyYCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uLmVsZW1lbnQpO1xuXG4gICAgY29uc3QgcnVsZXNJbnB1dCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAucnVsZXNfX2lucHV0YCk7XG4gICAgY29uc3QgcnVsZXNCdXR0b24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLnJ1bGVzX19idXR0b25gKTtcblxuICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGlucHV0IGlzIGVtcHR5XG4gICAgcnVsZXNJbnB1dC5hZGRFdmVudExpc3RlbmVyKGBpbnB1dGAsIGV2dCA9PiB7XG4gICAgICBydWxlc0J1dHRvbi5kaXNhYmxlZCA9IGV2dC50YXJnZXQudmFsdWUubGVuZ3RoID09PSAwO1xuICAgIH0pO1xuXG4gICAgcnVsZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoKSA9PiB0aGlzLm9uQ2xpY2socnVsZXNJbnB1dC52YWx1ZSkpO1xuICB9XG5cbiAgb25DbGljaygpIHt9XG59XG4iLCJpbXBvcnQgUnVsZXNWaWV3IGZyb20gJy4uL3ZpZXcvcnVsZXMtdmlldyc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4uL3JvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucnVsZXNTY3JlZW4gPSBuZXcgUnVsZXNWaWV3KCk7XG4gICAgdGhpcy5ydWxlc1NjcmVlbi5vbkNsaWNrID0gcGxheWVyTmFtZSA9PiBSb3V0ZXIuc2hvd0RhdGEocGxheWVyTmFtZSk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlc1NjcmVlbi5lbGVtZW50O1xuICB9XG59XG4iLCJjb25zdCBnYW1lRGF0YSA9IHtcbiAgaW5pdGlhbFN0YXRlOiB7XG4gICAgbGV2ZWw6IDAsXG4gICAgbGl2ZXM6IDMsXG4gICAgdGltZTogMzAsXG4gICAgYW5zd2VyczogW11cbiAgfSxcblxuICBTQ09SRToge1xuICAgIFJJR0hUX0FOU1dFUjogMTAwLFxuICAgIEJPTlVTX0FOU1dFUjogNTAsXG4gICAgT05FX0xJRkVfU0NPUkU6IDUwLFxuICAgIFFVSUNLX0FOU1dFUjogMjAsIC8vIHNlY1xuICAgIFNMT1dfQU5TV0VSOiAxMFxuICB9LFxuXG4gIGdldEFuc3dlcih0aW1lU3BlbnQsIGNvbXBsZXRlZCkge1xuICAgIGlmIChjb21wbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gYHdyb25nYDtcbiAgICB9XG5cbiAgICBpZiAodGltZVNwZW50ID49IHRoaXMuU0NPUkUuUVVJQ0tfQU5TV0VSKSB7XG4gICAgICByZXR1cm4gYGZhc3RgO1xuICAgIH1cblxuICAgIGlmICh0aW1lU3BlbnQgPD0gdGhpcy5TQ09SRS5TTE9XX0FOU1dFUikge1xuICAgICAgcmV0dXJuIGBzbG93YDtcbiAgICB9XG5cbiAgICBpZiAoY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gYGNvcnJlY3RgO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICBjYWxjdWxhdGVUb3RhbFNjb3JlKGFuc3dlcnMsIGxpdmVzKSB7XG4gICAgcmV0dXJuIGFuc3dlcnMucmVkdWNlKChzY29yZSwgaXQpID0+IHtcbiAgICAgIGlmIChpdC5jb21wbGV0ZWQgIT09IGB3cm9uZ2ApIHtcbiAgICAgICAgc2NvcmUgKz0gdGhpcy5TQ09SRS5SSUdIVF9BTlNXRVI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdC5jb21wbGV0ZWQgPT09IGBmYXN0YCkge1xuICAgICAgICBzY29yZSArPSB0aGlzLlNDT1JFLkJPTlVTX0FOU1dFUjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0LmNvbXBsZXRlZCA9PT0gYHNsb3dgKSB7XG4gICAgICAgIHNjb3JlIC09IHRoaXMuU0NPUkUuQk9OVVNfQU5TV0VSO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2NvcmU7XG4gICAgfSwgbGl2ZXMgKiB0aGlzLlNDT1JFLk9ORV9MSUZFX1NDT1JFKTtcbiAgfSxcblxuICBjaGFuZ2VMZXZlbChzdGF0ZSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgbGV2ZWw6IHN0YXRlLmxldmVsICsgMSxcbiAgICAgIHRpbWU6IHRoaXMuaW5pdGlhbFN0YXRlLnRpbWVcbiAgICB9KTtcbiAgfSxcblxuICBzZXRMaXZlcyhzdGF0ZSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgbGl2ZXM6IHN0YXRlLmxpdmVzIC0gMVxuICAgIH0pO1xuICB9LFxuXG4gIHB1c2hBbnN3ZXIoYW5zd2VycywgY29tcGxldGVkLCB0aW1lU3BlbnQpIHtcbiAgICByZXR1cm4gYW5zd2Vycy5jb25jYXQodGhpcy5nZXRBbnN3ZXIodGltZVNwZW50LCBjb21wbGV0ZWQpKTtcbiAgfSxcblxuICBhZGRBbnN3ZXIoc3RhdGUsIGNvbXBsZXRlZCwgdGltZVNwZW50KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBhbnN3ZXJzOiB0aGlzLnB1c2hBbnN3ZXIoc3RhdGUuYW5zd2VycywgY29tcGxldGVkLCB0aW1lU3BlbnQpXG4gICAgfSk7XG4gIH0sXG5cbiAgdGljayhzdGF0ZSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgdGltZTogc3RhdGUudGltZSAtIDFcbiAgICB9KTtcbiAgfSxcblxuICBnZXRGaW5hbFN0YXRzKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRzOiBzdGF0ZS5hbnN3ZXJzLFxuICAgICAgbGl2ZXM6IHN0YXRlLmxpdmVzLFxuICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlVG90YWxTY29yZShzdGF0ZS5hbnN3ZXJzLCBzdGF0ZS5saXZlcylcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lRGF0YTtcbiIsImltcG9ydCBCYWNrQnV0dG9uQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVyL2JhY2stYnV0dG9uLWNvbnRyb2xsZXInO1xuaW1wb3J0IGdhbWVEYXRhIGZyb20gJy4uL2RhdGEvZ2FtZS1kYXRhJztcbmltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9hYnN0cmFjdC12aWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyRGF0YVZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuYnV0dG9uID0gbmV3IEJhY2tCdXR0b25Db250cm9sbGVyKCk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbWVfX3RpbWVyXCI+JHt0aGlzLnN0YXRlLnRpbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19saXZlc1wiPlxuICAgICAgICAgICR7bmV3IEFycmF5KGdhbWVEYXRhLmluaXRpYWxTdGF0ZS5saXZlcyAtIHRoaXMuc3RhdGUubGl2ZXMpXG4gICAgICAgICAgICAuZmlsbChcbiAgICAgICAgICAgICAgYDxpbWcgc3JjPVwiLi4vaW1nL2hlYXJ0X19lbXB0eS5zdmdcIiBjbGFzcz1cImdhbWVfX2hlYXJ0XCJcbiAgICAgICAgICBhbHQ9XCIgTWlzc2VkIExpZmVcIiB3aWR0aD1cIjMxXCIgaGVpZ2h0PVwiMjdcIj5gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuam9pbihgYCl9XG4gICAgICAgICAgJHtuZXcgQXJyYXkodGhpcy5zdGF0ZS5saXZlcylcbiAgICAgICAgICAgIC5maWxsKFxuICAgICAgICAgICAgICBgPGltZyBzcmM9XCIuLi9pbWcvaGVhcnRfX2Z1bGwuc3ZnXCIgY2xhc3M9XCJnYW1lX19oZWFydFwiXG4gICAgICAgICAgYWx0PVwiTGlmZVwiIHdpZHRoPVwiMzFcIiBoZWlnaHQ9XCIyN1wiPmBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKGBgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCB0aW1lciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuZ2FtZV9fdGltZXJgKTtcbiAgICBpZiAodGhpcy5zdGF0ZS50aW1lIDw9IDUpIHtcbiAgICAgIHRpbWVyLnN0eWxlLmNvbG9yID0gYHJlZGA7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIuc3R5bGUuY29sb3IgPSBgYmxhY2tgO1xuICAgICAgfSwgNTAwKTsgLy8gaGFsZiBzZWNcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IHN0YXRzVGVtcGxhdGUgPSBzdGF0ZSA9PiBgXG4gIDx1bCBjbGFzcz1cInN0YXRzXCI+XG4gICAgJHtzdGF0ZVxuICAgICAgLm1hcChpdCA9PiB7XG4gICAgICAgIGlmIChpdCA9PT0gYHdyb25nYCkge1xuICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwic3RhdHNfX3Jlc3VsdCBzdGF0c19fcmVzdWx0LS13cm9uZ1wiPjwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdCA9PT0gYGZhc3RgKSB7XG4gICAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJzdGF0c19fcmVzdWx0IHN0YXRzX19yZXN1bHQtLWZhc3RcIj48L2xpPmA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXQgPT09IGBzbG93YCkge1xuICAgICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwic3RhdHNfX3Jlc3VsdCBzdGF0c19fcmVzdWx0LS1zbG93XCI+PC9saT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ID09PSBgY29ycmVjdGApIHtcbiAgICAgICAgICByZXR1cm4gYDxsaSBjbGFzcz1cInN0YXRzX19yZXN1bHQgc3RhdHNfX3Jlc3VsdC0tY29ycmVjdFwiPjwvbGk+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSlcbiAgICAgIC5qb2luKGBgKX1cbiAgICAke25ldyBBcnJheSgxMCAtIHN0YXRlLmxlbmd0aClcbiAgICAgIC5maWxsKGA8bGkgY2xhc3M9XCJzdGF0c19fcmVzdWx0IHN0YXRzX19yZXN1bHQtLXVua25vd25cIj48L2xpPmApXG4gICAgICAuam9pbihgYCl9XG4gIDwvdWw+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBzdGF0c1RlbXBsYXRlO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuaW1wb3J0IHN0YXRzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3N0YXRzLXRlbXBsYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9uZVZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgZGF0YSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZ2FtZVwiPlxuICAgICAgICA8cCBjbGFzcz1cImdhbWVfX3Rhc2tcIj4ke3RoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5xdWVzdGlvbn08L3A+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZ2FtZV9fY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lX19vcHRpb25cIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0uYW5zd2Vyc1swXS5pbWFnZS51cmx9XCJcbiAgICAgICAgICAgICAgYWx0PVwiT3B0aW9uIDFcIlxuICAgICAgICAgICAgICB3aWR0aD1cIjQ2OFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjQ1OFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ2FtZV9fYW5zd2VyIGdhbWVfX2Fuc3dlci0tcGhvdG9cIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJxdWVzdGlvbjFcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJwaG90b1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuPtCk0L7RgtC+PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdhbWVfX2Fuc3dlciBnYW1lX19hbnN3ZXItLXBhaW50XCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlc3Rpb24xXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwicGFpbnRpbmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QoNC40YHRg9C90L7Qujwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWVfX29wdGlvblwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIke3RoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzWzFdLmltYWdlLnVybH1cIlxuICAgICAgICAgICAgICBhbHQ9XCJPcHRpb24gMlwiXG4gICAgICAgICAgICAgIHdpZHRoPVwiNDY4XCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiNDU4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnYW1lX19hbnN3ZXIgIGdhbWVfX2Fuc3dlci0tcGhvdG9cIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJxdWVzdGlvbjJcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJwaG90b1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuPtCk0L7RgtC+PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdhbWVfX2Fuc3dlciAgZ2FtZV9fYW5zd2VyLS1wYWludFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXN0aW9uMlwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cInBhaW50aW5nXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4+0KDQuNGB0YPQvdC+0Lo8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgICR7c3RhdHNUZW1wbGF0ZSh0aGlzLnN0YXRlLmFuc3dlcnMpfVxuICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGdhbWVBbnN3ZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdhbWVfX2Fuc3dlciBpbnB1dGApO1xuICAgIC8vIENoYW5nZSBzY3JlZW4gaWYgYm90aCBpbnB1dHMgYXJlIGNoZWNrZWRcbiAgICBnYW1lQW5zd2VyLmZvckVhY2goaXQgPT4ge1xuICAgICAgaXQuYWRkRXZlbnRMaXN0ZW5lcihgaW5wdXRgLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgYC5nYW1lX19hbnN3ZXIgaW5wdXQ6Y2hlY2tlZGBcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBjbGlja2VkIGVsZW1lbnQgbWF0Y2hlcyBkYXRhXG4gICAgICAgIGlmIChyYWRpby5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICB0aGlzLm9uQW5zd2VyKFxuICAgICAgICAgICAgcmFkaW9bMF0udmFsdWUgPT09IHRoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzWzBdLnR5cGUgJiZcbiAgICAgICAgICAgICAgcmFkaW9bMV0udmFsdWUgPT09IHRoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzWzFdLnR5cGVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uQW5zd2VyKCkge31cbn1cbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9hYnN0cmFjdC12aWV3JztcbmltcG9ydCBzdGF0c1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9zdGF0cy10ZW1wbGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVUd29WaWV3IGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUsIGRhdGEpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c2VjdGlvbiBjbGFzcz1cImdhbWVcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJnYW1lX190YXNrXCI+JHt0aGlzLmRhdGFbdGhpcy5zdGF0ZS5sZXZlbF0ucXVlc3Rpb259PC9wPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImdhbWVfX2NvbnRlbnQgIGdhbWVfX2NvbnRlbnQtLXdpZGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fb3B0aW9uXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMF0uaW1hZ2UudXJsfVwiXG4gICAgICAgICAgICAgIGFsdD1cIk9wdGlvbiAxXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCI3MDVcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI0NTVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdhbWVfX2Fuc3dlciAgZ2FtZV9fYW5zd2VyLS1waG90b1wiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInF1ZXN0aW9uMVwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cInBob3RvXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4+0KTQvtGC0L48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ2FtZV9fYW5zd2VyICBnYW1lX19hbnN3ZXItLXBhaW50XCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicXVlc3Rpb24xXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwicGFpbnRpbmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QoNC40YHRg9C90L7Qujwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgJHtzdGF0c1RlbXBsYXRlKHRoaXMuc3RhdGUuYW5zd2Vycyl9XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgY29uc3QgZ2FtZUFuc3dlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZ2FtZV9fYW5zd2VyIGlucHV0YCk7XG5cbiAgICBnYW1lQW5zd2VyLmZvckVhY2goaXQgPT4ge1xuICAgICAgaXQuYWRkRXZlbnRMaXN0ZW5lcihgaW5wdXRgLCBldnQgPT4ge1xuICAgICAgICB0aGlzLm9uQW5zd2VyKFxuICAgICAgICAgIGV2dC50YXJnZXQudmFsdWUgPT09IHRoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzWzBdLnR5cGVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25BbnN3ZXIoKSB7fVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuaW1wb3J0IHN0YXRzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3N0YXRzLXRlbXBsYXRlJztcbmltcG9ydCB7IGNoZWNrSWZFbGVtZW50RXhpc3QgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVRocmVlVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBkYXRhKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJnYW1lXCI+XG4gICAgICAgIDxwIGNsYXNzPVwiZ2FtZV9fdGFza1wiPiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLnF1ZXN0aW9ufTwvcD5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJnYW1lX19jb250ZW50ICBnYW1lX19jb250ZW50LS10cmlwbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fb3B0aW9uXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMF0uaW1hZ2UudXJsfVwiXG4gICAgICAgICAgICAgIGFsdD1cIk9wdGlvbiAxXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMDRcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI0NTVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fb3B0aW9uICBnYW1lX19vcHRpb24tLXNlbGVjdGVkXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMV0uaW1hZ2UudXJsfVwiXG4gICAgICAgICAgICAgIGFsdD1cIk9wdGlvbiAyXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMDRcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI0NTVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FtZV9fb3B0aW9uXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5kYXRhW3RoaXMuc3RhdGUubGV2ZWxdLmFuc3dlcnNbMl0uaW1hZ2UudXJsfVwiXG4gICAgICAgICAgICAgIGFsdD1cIk9wdGlvbiAzXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIzMDRcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCI0NTVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICAke3N0YXRzVGVtcGxhdGUodGhpcy5zdGF0ZS5hbnN3ZXJzKX1cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBnYW1lQW5zd2VyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5nYW1lX19vcHRpb25gKTtcbiAgICBjb25zdCBpc1JpZ2h0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5nYW1lX190YXNrYCk7XG5cbiAgICBjb25zdCBnZXRCb251c0Fuc3dlcnMgPSBldnQgPT4ge1xuICAgICAgaWYgKGlzUmlnaHQudGV4dENvbnRlbnQgPT09IGDQndCw0LnQtNC40YLQtSDRhNC+0YLQviDRgdGA0LXQtNC4INC40LfQvtCx0YDQsNC20LXQvdC40LlgKSB7XG4gICAgICAgIHJldHVybiBjaGVja0lmRWxlbWVudEV4aXN0KFxuICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzLFxuICAgICAgICAgIGBwaG90b2AsXG4gICAgICAgICAgZXZ0LnRhcmdldC5zcmNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlzUmlnaHQudGV4dENvbnRlbnQgPT09IGDQndCw0LnQtNC40YLQtSDRgNC40YHRg9C90L7QuiDRgdGA0LXQtNC4INC40LfQvtCx0YDQsNC20LXQvdC40LlgXG4gICAgICAgID8gY2hlY2tJZkVsZW1lbnRFeGlzdChcbiAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLnN0YXRlLmxldmVsXS5hbnN3ZXJzLFxuICAgICAgICAgICAgYHBhaW50aW5nYCxcbiAgICAgICAgICAgIGV2dC50YXJnZXQuc3JjXG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGw7XG4gICAgfTtcblxuICAgIGdhbWVBbnN3ZXIuZm9yRWFjaChpdCA9PiB7XG4gICAgICBpdC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGV2dCA9PiB0aGlzLm9uQW5zd2VyKGdldEJvbnVzQW5zd2VycyhldnQpKSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkFuc3dlcigpIHt9XG59XG4iLCJpbXBvcnQgeyByZW5kZXJHYW1lIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQgSGVhZGVyRGF0YVZpZXcgZnJvbSAnLi4vdmlldy9oZWFkZXItZGF0YS12aWV3JztcbmltcG9ydCBHYW1lT25lVmlldyBmcm9tICcuLi92aWV3L2dhbWUtMS12aWV3JztcbmltcG9ydCBHYW1lVHdvVmlldyBmcm9tICcuLi92aWV3L2dhbWUtMi12aWV3JztcbmltcG9ydCBHYW1lVGhyZWVWaWV3IGZyb20gJy4uL3ZpZXcvZ2FtZS0zLXZpZXcnO1xuaW1wb3J0IEJhY2tCdXR0b25Db250cm9sbGVyIGZyb20gJy4vYmFjay1idXR0b24tY29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5zY3JlZW4gPSB0aGlzLmluaXRHYW1lKFxuICAgICAgdGhpcy5tb2RlbC5zdGF0ZSxcbiAgICAgIHRoaXMubW9kZWwuZGF0YSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0Q3VycmVudExldmVsKClcbiAgICApO1xuICAgIHRoaXMuaGVhZGVyRGF0YSA9IG5ldyBIZWFkZXJEYXRhVmlldyh0aGlzLm1vZGVsLnN0YXRlKTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSBuZXcgQmFja0J1dHRvbkNvbnRyb2xsZXIoKTtcblxuICAgIHRoaXMudXBkYXRlSGVhZGVyKCk7XG5cbiAgICB0aGlzLnJvb3QgPSByZW5kZXJHYW1lKHRoaXMuaGVhZGVyRGF0YSwgdGhpcy5zY3JlZW4pO1xuXG4gICAgdGhpcy5zY3JlZW4ub25BbnN3ZXIgPSB0aGlzLmFuc3dlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xuICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdDtcbiAgfVxuXG4gIGluaXRHYW1lKHN0YXRlLCBkYXRhLCBsZXZlbCkge1xuICAgIGlmIChsZXZlbC50eXBlID09PSBgdHdvLW9mLXR3b2ApIHtcbiAgICAgIHJldHVybiBuZXcgR2FtZU9uZVZpZXcoc3RhdGUsIGRhdGEpO1xuICAgIH1cblxuICAgIGlmIChsZXZlbC50eXBlID09PSBgdGluZGVyLWxpa2VgKSB7XG4gICAgICByZXR1cm4gbmV3IEdhbWVUd29WaWV3KHN0YXRlLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAobGV2ZWwudHlwZSA9PT0gYG9uZS1vZi10aHJlZWApIHtcbiAgICAgIHJldHVybiBuZXcgR2FtZVRocmVlVmlldyhzdGF0ZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbCk7XG4gIH1cblxuICBzdGFydFRpbWVyKCkge1xuICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RlbC50aWNrKCk7XG4gICAgICB0aGlzLnVwZGF0ZUhlYWRlcigpO1xuXG4gICAgICBpZiAodGhpcy5tb2RlbC5oYXNUaW1lKCkpIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRMaXZlcygpO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZEFuc3dlcigpO1xuICAgICAgICB0aGlzLmNvbnRpbnVlR2FtZSgpO1xuICAgICAgfVxuICAgIH0sIDEwMDApOyAvLyAxIHNlY1xuICB9XG5cbiAgYW5zd2VyKGFuc3dlcikge1xuICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgaWYgKCFhbnN3ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0TGl2ZXMoKTtcbiAgICB9XG4gICAgdGhpcy5tb2RlbC5hZGRBbnN3ZXIoYW5zd2VyKTtcbiAgICB0aGlzLmNvbnRpbnVlR2FtZSgpO1xuICB9XG5cbiAgY29udGludWVHYW1lKCkge1xuICAgIGlmICh0aGlzLm1vZGVsLmRpZSgpKSB7XG4gICAgICB0aGlzLmVuZEdhbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFuZ2VHYW1lKCk7XG4gICAgfVxuICB9XG5cbiAgZW5kR2FtZSgpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLm1vZGVsLnVwZGF0ZVNjb3JlKHRoaXMubW9kZWwuc3RhdGUpO1xuICAgIFJvdXRlci5zaG93UmVzdWx0KHJlc3VsdCwgdGhpcy5tb2RlbC5wbGF5ZXJOYW1lKTtcbiAgfVxuXG4gIGNoYW5nZUdhbWUoKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VMZXZlbCgpO1xuICAgIFJvdXRlci5zaG93R2FtZSh0aGlzLm1vZGVsKTtcbiAgfVxuXG4gIHVwZGF0ZUhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBuZXcgSGVhZGVyRGF0YVZpZXcodGhpcy5tb2RlbC5zdGF0ZSk7XG4gICAgdGhpcy5oZWFkZXJEYXRhLmVsZW1lbnQucmVwbGFjZVdpdGgoaGVhZGVyLmVsZW1lbnQpO1xuICAgIHRoaXMuaGVhZGVyRGF0YSA9IGhlYWRlcjtcbiAgICBoZWFkZXIuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBoZWFkZXJgKS5wcmVwZW5kKHRoaXMuYmFja0J1dHRvbi5lbGVtZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvclZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwibW9kYWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsX19pbm5lclwiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cIm1vZGFsX190aXRsZVwiPtCf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAhPC9oMj5cbiAgICAgICAgICA8cCBjbGFzcz1cIm1vZGFsX190ZXh0IG1vZGFsX190ZXh0LS1lcnJvclwiPlxuICAgICAgICAgICAg0KHRgtCw0YLRg9GBOiA0MDQuINCf0L7QttCw0LvRg9C50YHRgtCwLCDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLQtSDRgdGC0YDQsNC90LjRhtGDLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxufVxuIiwiaW1wb3J0IGdhbWVEYXRhIGZyb20gJy4vZGF0YS9nYW1lLWRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTW9kZWwge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXJOYW1lLCBkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnBsYXllck5hbWUgPSBwbGF5ZXJOYW1lO1xuICAgIHRoaXMucmVzdGFydCgpO1xuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIGRpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNOZXh0TGV2ZWwoKSB8fCB0aGlzLmhhc0xpdmVzKCk7XG4gIH1cblxuICBoYXNOZXh0TGV2ZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TGV2ZWwodGhpcy5fc3RhdGUubGV2ZWwgKyAxKSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgY2hhbmdlTGV2ZWwoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBnYW1lRGF0YS5jaGFuZ2VMZXZlbCh0aGlzLl9zdGF0ZSk7XG4gIH1cblxuICBnZXRMZXZlbChzdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbc3RhdGVdO1xuICB9XG5cbiAgc2V0TGl2ZXMoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBnYW1lRGF0YS5zZXRMaXZlcyh0aGlzLl9zdGF0ZSk7XG4gIH1cblxuICBhZGRBbnN3ZXIoY29tcGxldGVkID0gZmFsc2UpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGdhbWVEYXRhLmFkZEFuc3dlcih0aGlzLl9zdGF0ZSwgY29tcGxldGVkLCB0aGlzLl9zdGF0ZS50aW1lKTtcbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSBnYW1lRGF0YS5pbml0aWFsU3RhdGU7XG4gIH1cblxuICBoYXNMaXZlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUubGl2ZXMgPD0gMDtcbiAgfVxuXG4gIGhhc1RpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnRpbWUgPD0gMDtcbiAgfVxuXG4gIGdldEN1cnJlbnRMZXZlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMZXZlbCh0aGlzLl9zdGF0ZS5sZXZlbCk7XG4gIH1cblxuICB0aWNrKCkge1xuICAgIHRoaXMuX3N0YXRlID0gZ2FtZURhdGEudGljayh0aGlzLl9zdGF0ZSk7XG4gIH1cblxuICB1cGRhdGVTY29yZShtb2RlbCkge1xuICAgIHJldHVybiBnYW1lRGF0YS5nZXRGaW5hbFN0YXRzKG1vZGVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuaW1wb3J0IHN0YXRzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3N0YXRzLXRlbXBsYXRlJztcbmltcG9ydCBnYW1lRGF0YSBmcm9tICcuLi9kYXRhL2dhbWUtZGF0YSc7XG5pbXBvcnQgeyBnZXRDb3JyZWN0QW5zd2VycywgZ2V0Qm9udXNBbnN3ZXJzIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgQmFja0J1dHRvbkNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlci9iYWNrLWJ1dHRvbi1jb250cm9sbGVyJztcblxuY29uc3QgcmVzdWx0ID0ge1xuICBmYXN0OiBg0JHQvtC90YPRgSDQt9CwINGB0LrQvtGA0L7RgdGC0YxgLFxuICBhbGl2ZTogYNCR0L7QvdGD0YEg0LfQsCDQttC40LfQvdC4YCxcbiAgc2xvdzogYNCo0YLRgNCw0YQg0LfQsCDQvNC10LTQu9C40YLQtdC70YzQvdC+0YHRgtGMYFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0VmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5idXR0b24gPSBuZXcgQmFja0J1dHRvbkNvbnRyb2xsZXIoKTtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyXCI+PC9oZWFkZXI+XG4gIDxzZWN0aW9uIGNsYXNzPVwicmVzdWx0XCI+PC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuaGVhZGVyYCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uLmVsZW1lbnQpO1xuXG4gICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yZXN1bHRgKTtcbiAgfVxuXG4gIHNob3dTY29yZXMoc2NvcmVzKSB7XG4gICAgdGhpcy5fcmVzdWx0LmlubmVySFRNTCA9IGBcbiAgICAgIDxoMiBjbGFzcz1cInJlc3VsdF9fdGl0bGVcIj5cbiAgICAgICAgJHt0aGlzLnN0YXRlLmxpdmVzIDw9IDAgPyBg0J/QvtGA0LDQttC10L3QuNC1YCA6IGDQn9C+0LHQtdC00LAhYH1cbiAgICAgIDwvaDI+XG4gICAgICA8dGFibGUgY2xhc3M9XCJyZXN1bHRfX3RhYmxlXCI+XG4gICAgICAgICR7c2NvcmVzXG4gICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoaXQsIGkpID0+IGBcbiAgICA8dHI+XG4gICAgICA8dGQgY2xhc3M9XCJyZXN1bHRfX251bWJlclwiPiR7aSArIDF9LjwvdGQ+XG4gICAgICA8dGQgY29sc3Bhbj1cIjJcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwic3RhdHNcIj5cbiAgICAgICAgICAke3N0YXRzVGVtcGxhdGUoaXQuc3RhdHMpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC90ZD5cbiAgICAgICR7dGhpcy5yZW5kZXJSZXN1bHQoaXQpfVxuICAgIGBcbiAgICAgICAgICApXG4gICAgICAgICAgLmpvaW4oYGApfVxuICAgICAgPC90YWJsZT5cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyUmVzdWx0KGl0KSB7XG4gICAgaWYgKGl0LmxpdmVzIDw9IDApIHtcbiAgICAgIHJldHVybiBgXG4gICAgICA8dGQgY2xhc3M9XCJyZXN1bHRfX3RvdGFsXCI+PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fdG90YWwgcmVzdWx0X190b3RhbC0tZmluYWxcIj5mYWlsPC90ZD5cbiAgICA8L3RyPlxuICAgICAgYDtcbiAgICB9XG4gICAgcmV0dXJuIGBcbiAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fcG9pbnRzXCI+w5cgJHtnYW1lRGF0YS5TQ09SRS5SSUdIVF9BTlNXRVJ9PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fdG90YWxcIj4ke2dldENvcnJlY3RBbnN3ZXJzKGl0LnN0YXRzLCBgd3JvbmdgKSAqXG4gICAgICAgIGdhbWVEYXRhLlNDT1JFLlJJR0hUX0FOU1dFUn08L3RkPlxuICAgIDwvdHI+XG4gICAgJHt0aGlzLnJlbmRlckJvbnVzKGdldEJvbnVzQW5zd2VycyhpdC5zdGF0cywgYGZhc3RgKSwgYGZhc3RgKX1cbiAgICAke3RoaXMucmVuZGVyQm9udXMoaXQubGl2ZXMsIGBhbGl2ZWApfVxuICAgICR7dGhpcy5yZW5kZXJCb251cyhnZXRCb251c0Fuc3dlcnMoaXQuc3RhdHMsIGBzbG93YCksIGBzbG93YCl9XG4gICAgPHRyPlxuICAgICAgPHRkIGNvbHNwYW49XCI1XCIgY2xhc3M9XCJyZXN1bHRfX3RvdGFsICByZXN1bHRfX3RvdGFsLS1maW5hbFwiPiR7XG4gICAgICAgIGl0LnNjb3JlXG4gICAgICB9PC90ZD5cbiAgICA8L3RyPlxuXG4gICAgYDtcbiAgfVxuXG4gIHJlbmRlckJvbnVzKGFuc3dlciwgdHlwZSkge1xuICAgIHJldHVybiBgXG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48L3RkPlxuICAgICAgICA8dGQgY2xhc3M9XCJyZXN1bHRfX2V4dHJhXCI+JHtyZXN1bHRbdHlwZV19OjwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fZXh0cmFcIj5cbiAgICAgICAgICAke2Fuc3dlcn0gPHNwYW4gY2xhc3M9XCJzdGF0c19fcmVzdWx0IHN0YXRzX19yZXN1bHQtLSR7dHlwZX1cIj48L3NwYW4+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cInJlc3VsdF9fcG9pbnRzXCI+w5cgJHtnYW1lRGF0YS5TQ09SRS5CT05VU19BTlNXRVJ9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwicmVzdWx0X190b3RhbFwiPiR7YW5zd2VyICogZ2FtZURhdGEuU0NPUkUuQk9OVVNfQU5TV0VSfTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIGA7XG4gIH1cbn1cbiIsImNvbnN0IFNFUlZFUl9VUkwgPSBgaHR0cHM6Ly9lcy5kdW1wLmFjYWRlbXkvcGl4ZWwtaHVudGVyYDtcblxuY29uc3QgREVGQVVMVF9OQU1FID0gYEthcHBhYDtcbmNvbnN0IEFQUF9JRCA9IDM3NTE0NjMwMjI7XG5cbmNvbnN0IGNoZWNrU3RhdHVzID0gcmVzcG9uc2UgPT4ge1xuICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke3Jlc3BvbnNlLnN0YXR1c306ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgfVxufTtcblxuY29uc3QgdG9KU09OID0gcmVzID0+IHJlcy5qc29uKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRlciB7XG4gIHN0YXRpYyBhc3luYyBsb2FkRGF0YSgpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1NFUlZFUl9VUkx9L3F1ZXN0aW9uc2ApO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNoZWNrU3RhdHVzKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gdG9KU09OKHJlcyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgbG9hZFJlc3VsdHMobmFtZSA9IERFRkFVTFRfTkFNRSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7U0VSVkVSX1VSTH0vc3RhdHMvOiR7QVBQX0lEfS06JHtuYW1lfWApO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNoZWNrU3RhdHVzKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gdG9KU09OKHJlcyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgc2F2ZVJlc3VsdHMoZGF0YSwgbmFtZSA9IERFRkFVTFRfTkFNRSkge1xuICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKHsgbmFtZSB9LCBkYXRhKTtcbiAgICBjb25zdCByZXF1ZXN0U2V0dGluZ3MgPSB7XG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IGBhcHBsaWNhdGlvbi9qc29uYFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogYFBPU1RgXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYCR7U0VSVkVSX1VSTH0vc3RhdHMvOiR7QVBQX0lEfS06JHtuYW1lfWAsXG4gICAgICByZXF1ZXN0U2V0dGluZ3NcbiAgICApO1xuICAgIHJldHVybiBjaGVja1N0YXR1cyhyZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEludHJvQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIvaW50cm8tY29udHJvbGxlcic7XG5pbXBvcnQgR3JlZXRpbmdDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci9ncmVldGluZy1jb250cm9sbGVyJztcbmltcG9ydCBSdWxlc0NvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyL3J1bGVzLWNvbnRyb2xsZXInO1xuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci9nYW1lLWNvbnRyb2xsZXInO1xuaW1wb3J0IEVycm9yVmlldyBmcm9tICcuL3ZpZXcvZXJyb3Itdmlldyc7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gJy4vZ2FtZS1tb2RlbCc7XG5pbXBvcnQgUmVzdWx0VmlldyBmcm9tICcuL3ZpZXcvcmVzdWx0LXZpZXcnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuL2xvYWRlcic7XG5cbmxldCBnYW1lRGF0YTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgTG9hZGVyLmxvYWREYXRhKClcbiAgICAgIC50aGVuKGRhdGEgPT4gKGdhbWVEYXRhID0gZGF0YSkpXG4gICAgICAudGhlbigoKSA9PiBSb3V0ZXIuc2hvd0ludHJvKCkpXG4gICAgICAuY2F0Y2goUm91dGVyLnNob3dFcnJvcik7XG4gIH1cblxuICBzdGF0aWMgc2hvd0ludHJvKCkge1xuICAgIGNvbnN0IGludHJvID0gbmV3IEludHJvQ29udHJvbGxlcigpO1xuICAgIGNoYW5nZVZpZXcoaW50cm8pO1xuICB9XG5cbiAgc3RhdGljIHNob3dHcmVldGluZygpIHtcbiAgICBjb25zdCBncmVldGluZyA9IG5ldyBHcmVldGluZ0NvbnRyb2xsZXIoKTtcbiAgICBjaGFuZ2VWaWV3KGdyZWV0aW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93UnVsZXMoKSB7XG4gICAgY29uc3QgcnVsZXMgPSBuZXcgUnVsZXNDb250cm9sbGVyKCk7XG4gICAgY2hhbmdlVmlldyhydWxlcyk7XG4gIH1cblxuICBzdGF0aWMgc2hvd0RhdGEocGxheWVyTmFtZSkge1xuICAgIFJvdXRlci5zaG93R2FtZShuZXcgR2FtZU1vZGVsKHBsYXllck5hbWUsIGdhbWVEYXRhKSk7XG4gIH1cblxuICBzdGF0aWMgc2hvd0dhbWUobW9kZWwpIHtcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWVDb250cm9sbGVyKG1vZGVsKTtcbiAgICBjaGFuZ2VWaWV3KGdhbWUpO1xuICB9XG5cbiAgc3RhdGljIHNob3dSZXN1bHQoc3RhdGUsIHBsYXllck5hbWUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUmVzdWx0VmlldyhzdGF0ZSk7XG4gICAgY2hhbmdlVmlldyhyZXN1bHQpO1xuXG4gICAgTG9hZGVyLnNhdmVSZXN1bHRzKHN0YXRlLCBwbGF5ZXJOYW1lKVxuICAgICAgLnRoZW4oKCkgPT4gTG9hZGVyLmxvYWRSZXN1bHRzKHBsYXllck5hbWUpKVxuICAgICAgLnRoZW4oZGF0YSA9PiByZXN1bHQuc2hvd1Njb3JlcyhkYXRhKSlcbiAgICAgIC5jYXRjaChSb3V0ZXIuc2hvd0Vycm9yKTtcbiAgfVxuXG4gIHN0YXRpYyBzaG93RXJyb3IoKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3JWaWV3KCk7XG4gICAgY2hhbmdlVmlldyhlcnJvcik7XG4gIH1cbn1cbiIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICBSb3V0ZXIuaW5pdCgpO1xufTtcblxuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdldEJvbnVzQW5zd2VycyIsImdhbWVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7QUFFcEQsRUFBTyxNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSztFQUNqRCxFQUFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxD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
