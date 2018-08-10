import {render, selectSlide} from "./util";
import greetingScreen from "./greeting";

const template = `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
`;

const introScreen = render(template);

const asterisk = introScreen.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => selectSlide(greetingScreen));

export default introScreen;
