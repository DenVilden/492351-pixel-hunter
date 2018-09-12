import {show, renderHeader} from "./util";
import greetingScreen from "./greeting";
import game from "./data/game";
import {screenTemplate, updateState} from "./game-render";
import GameThreeView from "./view/game-3-view";
import HeaderDataView from "./view/header-data-view";
import data from "./data/game-data";

export default (state) => {
  const gameThreeScreen = new GameThreeView(state, game);
  const headerData = new HeaderDataView(state, data);

  renderHeader(headerData, gameThreeScreen);

  gameThreeScreen.onSuccess = () => show(screenTemplate(updateState(state)));
  gameThreeScreen.onFail = () =>
    show(screenTemplate(updateState(state, 1, false)));

  headerData.onClick = () => show(greetingScreen());

  return gameThreeScreen.element;
};
