import {show, renderHeader} from "./util";
import greetingScreen from "./greeting";
import game from "./data/game";
import {screenTemplate, updateState} from "./game-render";
import GameTwoView from "./view/game-2-view";
import HeaderDataView from "./view/header-data-view";
import data from "./data/game-data";

export default (state) => {
  const gameTwoScreen = new GameTwoView(state, game);
  const headerData = new HeaderDataView(state, data);

  renderHeader(headerData, gameTwoScreen);

  gameTwoScreen.onSuccess = () => show(screenTemplate(updateState(state)));
  gameTwoScreen.onFail = () =>
    show(screenTemplate(updateState(state, 1, false)));

  headerData.onClick = () => show(greetingScreen());

  return gameTwoScreen.element;
};
