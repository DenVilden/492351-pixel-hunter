import RulesView from "../view/rules-view";
import Router from "../router";

export default class RulesController {
  constructor() {
    this.rulesScreen = new RulesView();
    this.rulesScreen.onClick = (playerName) => Router.showData(playerName);
  }

  get element() {
    return this.rulesScreen.element;
  }
}
