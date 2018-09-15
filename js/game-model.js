import data from "./data/game-data";
import game from "./data/game";

const getLevel = (state) => game[state.level].type;

export default class GameModel {
  constructor(playerName = `Игрок`) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  die() {
    return !this.hasNextLevel() || this.noLives();
  }

  hasNextLevel() {
    return data.checkLevel(this._state.level + 1) > -1;
  }

  changeLevel() {
    this._state = data.changeLevel(this._state);
  }

  setLives() {
    this._state = data.setLives(this._state);
  }

  addAnswer(completed = false) {
    this._state = data.addAnswer(this._state, completed, this._state.time);
  }

  restart() {
    this._state = data.initialState;
  }

  noLives() {
    return this._state.lives <= 0;
  }

  noTime() {
    return this._state.time <= 0;
  }

  getCurrentLevel() {
    return getLevel(this._state);
  }

  tick() {
    this._state = data.tick(this._state);
  }
}
