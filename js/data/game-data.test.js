import {assert} from "chai";
import data from "./game-data";

describe(`Calculate score`, () => {
  it(`should return -1 if array contains less than 10 answers`, () => {
    assert.equal(
        data.calculateScore(data.populateAnswers(true, 20, 9), 3),
        -1,
        `game is completed`
    );
  });
  it(`should return 1150 if the game is completed normally with all lives`, () => {
    assert.equal(
        data.calculateScore(data.populateAnswers(true, 15, 10), 3),
        1150,
        `something went wrong`
    );
  });
  it(`should return 1650 if the game is completed fast with all lives`, () => {
    assert.equal(
        data.calculateScore(data.populateAnswers(true, 25, 10), 3),
        1650,
        `something went wrong`
    );
  });
});

describe(`Change level`, () => {
  it(`should update level of the game`, () => {
    assert.equal(data.checkLevel(50), 50, `level has not updated`);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(
        () => data.checkLevel(-1),
        `Level should not be negative value`
    );
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => data.checkLevel([]), `Level should be typeof number`);
  });
});

describe(`Set time`, () => {
  it(`should set timer`, () => {
    assert.equal(data.setTime(20), 20, `can't set time`);
  });
  it(`should check if time limit is 30 seconds`, () => {
    assert.throws(() => data.setTime(40), `Time limit is 30 seconds`);
  });
});

describe(`Set lives`, () => {
  it(`should remove live`, () => {
    assert.equal(data.checkLives(2), 2, `can't remove live`);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => data.checkLives({}), `Life should be typeof number`);
  });
  it(`should not allow less than 0 or more than 3 lives`, () => {
    assert.throws(
        () => data.checkLives(4),
        `Cant have less than 0 or more than 3 lives`
    );
  });
});
