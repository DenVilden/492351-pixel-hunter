import data from "./data/game-data";
import game from "./data/game";
import statsScreen from "./stats";
import gameOneScreen from "./game-1";
import gameTwoScreen from "./game-2";
import gameThreeScreen from "./game-3";

export const screenTemplate = (state) => {
  // Show results if no more lives
  if (state.lives === 0) {
    return statsScreen(state);
  }

  // Show results if no more questions
  if (state.level === game.length) {
    return statsScreen(state);
  }

  if (game[state.level].type === `gameOne`) {
    return gameOneScreen(state);
  }

  if (game[state.level].type === `gameTwo`) {
    return gameTwoScreen(state);
  }

  if (game[state.level].type === `gameThree`) {
    return gameThreeScreen(state);
  }

  return null;
};

export const updateState = (
    state,
    live = 0,
    completed = true,
    timeSpent = 30
) => {
  return Object.assign({}, state, {
    level: data.changeLevel(state.level + 1),
    lives: data.setLives(state.lives - live),
    answers: data.addAnswer(state.answers, completed, timeSpent)
  });
};
