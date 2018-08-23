import {assert} from "chai";
import {data} from "./game-data";

describe(`Calculate score`, () => {
  it(`should return -1 if array contains less than 10 answers`, () => {
    assert.equal(
        -1,
        data.calculateScore(data.populateAnswers(true, 20, 9), 3),
        `game is completed`
    );
  });
  it(`should return 1150 if the game is completed normally with all lives`, () => {
    assert.equal(
        1150,
        data.calculateScore(
            data.populateAnswers(true, 20, 10),
            3,
            `something went wrong`
        )
    );
  });
  it(`should return 1650 if the game is completed fast with all lives`, () => {
    assert.equal(
        1650,
        data.calculateScore(
            data.populateAnswers(true, 5, 10),
            3,
            `something went wrong`
        )
    );
  });
});

describe(`Change level`, () => {
  it(`should update level of the game`, () => {
    assert.equal(50, data.changeLevel(50), `level hasnt updated`);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(
        () => data.changeLevel(-1),
        `Level should not be negative value`
    );
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => data.changeLevel([]), `Level should be typeof number`);
  });
});

describe(`Set time`, () => {
  it(`should set timer`, () => {
    assert.equal(20, data.setTime(20), `cant set time`);
  });
  it(`should check if time limit is 30 seconds`, () => {
    assert.throws(() => data.setTime(40), `Time limit is 30 seconds`);
  });
});

describe(`Set lives`, () => {
  it(`should set live`, () => {
    assert.equal(2, data.setLives(2), `cant update lives`);
  });
  it(`should end the game if all lives spent`, () => {
    assert.throws(() => data.setLives(0), `Game is over, no more lives`);
  });
  it(`should not allow less than 0 or more than 3 lives`, () => {
    assert.throws(
        () => data.setLives(4),
        `Cant have less than 0 or more than 3 lives`
    );
  });
});
