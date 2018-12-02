import Router from '../router';
import BackButtonView from '../view/back-button-view';

export default class BackButtonController {
  constructor() {
    this.backButton = new BackButtonView();
    this.backButton.onClick = () => Router.showGreeting();
  }

  get element() {
    return this.backButton.element;
  }
}
