import {renderGame} from "../util";
import StatsView from "../view/stats-view";
import BackButtonView from "../view/back-button-view";
import Router from "../router";

export default class StatsController {
  constructor(model) {
    this.model = model;
    this.statsScreen = new StatsView(this.model.state);
    this.backButton = new BackButtonView();

    this.root = renderGame(this.backButton, this.statsScreen);

    this.backButton.onClick = () => Router.showGreeting();
  }

  get element() {
    return this.root;
  }
}
