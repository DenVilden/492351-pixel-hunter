import StatsView from "../view/stats-view";

export default class StatsController {
  constructor(model) {
    this.model = model;
    this.statsScreen = new StatsView(this.model.state, this.model.data);
  }

  get element() {
    return this.statsScreen.element;
  }
}
