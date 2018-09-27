import {changeView} from "./util";
import IntroController from "./controller/intro-controller";
import GreetingController from "./controller/greeting-controller";
import RulesController from "./controller/rules-controller";
import GameController from "./controller/game-controller";
import ErrorView from "./view/error-view";
import GameModel from "./game-model";
import ResultView from "./view/result-view";
import Loader from "./loader";

let gameData;

export default class Router {
  static init() {
    Loader.loadData()
      .then((data) => (gameData = data))
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
    Router.showGame(new GameModel(playerName, gameData));
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
      .then((data) => result.showScores(data))
      .catch(Router.showError);
  }

  static showError() {
    const error = new ErrorView();
    changeView(error);
  }
}
