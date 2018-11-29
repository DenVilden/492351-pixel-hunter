import GreetingView from '../view/greeting-view';
import Router from '../router';

export default class GreetingController {
  constructor() {
    this.greetingScreen = new GreetingView();
    this.greetingScreen.onClick = () => Router.showRules();
  }

  get element() {
    return this.greetingScreen.element;
  }
}
