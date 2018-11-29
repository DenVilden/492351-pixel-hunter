import { assert } from 'chai';
import gameData from './game-data';

const populateAnswers = (completed, timeSpent, length) => {
  const answers = [];

  for (let index = 0; index < length; index++) {
    answers.push({
      completed,
      timeSpent
    });
  }
  return answers;
};

describe(`Calculate score`, () => {
  it(`should return 1150 if the game is completed normally with all lives`, () => {
    assert.equal(
      gameData.calculateTotalScore(populateAnswers(`correct`, 15, 10), 3),
      1150,
      `something went wrong`
    );
  });
  it(`should return 1650 if the game is completed fast with all lives`, () => {
    assert.equal(
      gameData.calculateTotalScore(populateAnswers(`fast`, 25, 10), 3),
      1650,
      `something went wrong`
    );
  });
});
