import {renderGame} from "../util";
import Router from "../router";
import HeaderDataView from "../view/header-data-view";
import GameOneView from "../view/game-1-view";
import GameTwoView from "../view/game-2-view";
import GameThreeView from "../view/game-3-view";

export default class GameController {
  constructor(model) {
    this.model = model;
    this.screen = this.initGame(this.model.state, this.model.getCurrentLevel());
    this.headerData = new HeaderDataView(this.model.state);

    this.root = renderGame(this.headerData, this.screen);

    this.screen.onAnswer = this.answer.bind(this);
    this.headerData.onClick = () => Router.showGreeting();

    this._interval = null;
    this.startTimer();
  }

  get element() {
    return this.root;
  }

  initGame(state, level) {
    if (level === `gameOne`) {
      return new GameOneView(state);
    }

    if (level === `gameTwo`) {
      return new GameTwoView(state);
    }

    if (level === `gameThree`) {
      return new GameThreeView(state);
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

      if (this.model.noTime()) {
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
  }
}
