import gameData from './data/game-data';

export default class GameModel {
  constructor(playerName, data) {
    this.data = data;
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  die() {
    return this.hasNextLevel() || this.hasLives();
  }

  hasNextLevel() {
    return this.getLevel(this._state.level + 1) === undefined;
  }

  changeLevel() {
    this._state = gameData.changeLevel(this._state);
  }

  getLevel(state) {
    return this.data[state];
  }

  setLives() {
    this._state = gameData.setLives(this._state);
  }

  addAnswer(completed = false) {
    this._state = gameData.addAnswer(this._state, completed, this._state.time);
  }

  restart() {
    this._state = gameData.initialState;
  }

  hasLives() {
    return this._state.lives <= 0;
  }

  hasTime() {
    return this._state.time <= 0;
  }

  getCurrentLevel() {
    return this.getLevel(this._state.level);
  }

  tick() {
    this._state = gameData.tick(this._state);
  }

  updateScore(model) {
    return gameData.getFinalStats(model);
  }
}
