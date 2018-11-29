import IntroView from '../view/intro-view';
import Router from '../router';

export default class IntroController {
  constructor() {
    this.introScreen = new IntroView();
    this.introScreen.onClick = () => Router.showGreeting();
  }

  get element() {
    return this.introScreen.element;
  }
}
