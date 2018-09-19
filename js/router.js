import {changeView} from "./util";
import IntroController from "./controller/intro-controller";
import GreetingController from "./controller/greeting-controller";
import RulesController from "./controller/rules-controller";
import StatsController from "./controller/stats-controller";
import GameController from "./controller/game-controller";
import ErrorView from "./view/error-view";
import GameModel from "./game-model";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let data;

export default class Router {
  static init() {
    window
      .fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((images) => (data = images))
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
    Router.showGame(new GameModel(playerName, data));
  }

  static showGame(model) {
    const game = new GameController(model);
    changeView(game);
  }

  static showStats(model) {
    const stats = new StatsController(model);
    changeView(stats);
  }

  static showError() {
    const error = new ErrorView();
    changeView(error);
  }
}
