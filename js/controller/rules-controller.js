import RulesView from "../view/rules-view";
import Router from "../router";

export default class RulesController {
  constructor() {
    this.rulesScreen = new RulesView();
    this.rulesScreen.onClick = () => Router.showData();
  }

  get element() {
    return this.rulesScreen.element;
  }
}
