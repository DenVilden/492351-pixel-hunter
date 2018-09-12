import {show, renderHeader} from "./util";
import greetingScreen from "./greeting";
import game from "./data/game";
import {screenTemplate, updateState} from "./game-render";
import GameOneView from "./view/game-1-view";
import HeaderDataView from "./view/header-data-view";
import data from "./data/game-data";

export default (state) => {
  const gameOneScreen = new GameOneView(state, game);
  const headerData = new HeaderDataView(state, data);

  renderHeader(headerData, gameOneScreen);

  gameOneScreen.onSuccess = () => show(screenTemplate(updateState(state)));
  gameOneScreen.onFail = () =>
    show(screenTemplate(updateState(state, 1, false)));

  headerData.onClick = () => show(greetingScreen());

  return gameOneScreen.element;
};
