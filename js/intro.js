import {show} from "./util";
import greetingScreen from "./greeting";
import IntroView from "./view/intro-view";

export default () => {
  const introScreen = new IntroView();

  introScreen.onClick = () => show(greetingScreen());

  return introScreen.element;
};
