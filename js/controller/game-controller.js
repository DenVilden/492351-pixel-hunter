import {renderGame} from "../util";
import Router from "../router";
import HeaderDataView from "../view/header-data-view";
import GameOneView from "../view/game-1-view";
import GameTwoView from "../view/game-2-view";
import GameThreeView from "../view/game-3-view";
import BackButtonController from "./back-button-controller";

export default class GameController {
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
    Router.showStats(this.model);
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
    header.onClick = () => Router.showGreeting();
  }
}
