import {changeView} from "./util";
import IntroController from "./controller/intro-controller";
import GreetingController from "./controller/greeting-controller";
import RulesController from "./controller/rules-controller";
import StatsController from "./controller/stats-controller";
import GameController from "./controller/game-controller";

export default class Router {
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

  static showGame(model) {
    const screen = new GameController(model);
    changeView(screen);
  }

  static showStats(model) {
    const statistics = new StatsController(model);
    changeView(statistics);
  }
}
