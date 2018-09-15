import {renderGame} from "../util";
import RulesView from "../view/rules-view";
import Router from "../router";
import BackButtonView from "../view/back-button-view";
import GameModel from "../game-model";

export default class RulesController {
  constructor() {
    this.rulesScreen = new RulesView();
    this.backButton = new BackButtonView();

    this.root = renderGame(this.backButton, this.rulesScreen);

    this.rulesScreen.onClick = () => Router.showGame(new GameModel());
    this.backButton.onClick = () => Router.showGreeting();
  }

  get element() {
    return this.root;
  }
}
