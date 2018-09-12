import {show, renderHeader} from "./util";
import {screenTemplate} from "./game-render";
import greetingScreen from "./greeting";
import data from "./data/game-data";
import RulesView from "./view/rules-view";
import BackButtonView from "./view/back-button-view";

export default () => {
  const rulesScreen = new RulesView();
  const backButton = new BackButtonView();

  renderHeader(backButton, rulesScreen);

  rulesScreen.onClick = () => show(screenTemplate(data.initialState));

  backButton.onClick = () => show(greetingScreen());

  return rulesScreen.element;
};
