import {show} from "./util";
import rulesScreen from "./rules";
import GreetingView from "./view/greeting-view";

export default () => {
  const greetingScreen = new GreetingView();

  greetingScreen.onClick = () => show(rulesScreen());

  return greetingScreen.element;
};
