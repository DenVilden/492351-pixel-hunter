import {show, renderHeader} from "./util";
import greetingScreen from "./greeting";
import data from "./data/game-data";
import StatsView from "./view/stats-view";
import BackButtonView from "./view/back-button-view";

export default (state) => {
  const statsScreen = new StatsView(state, data);
  const backButton = new BackButtonView();

  renderHeader(backButton, statsScreen);

  backButton.onClick = () => show(greetingScreen());

  return statsScreen.element;
};
