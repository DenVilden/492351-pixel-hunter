import game from "./game";

const data = {
  initialState: Object.freeze({
    level: 0,
    lives: 3,
    time: 30,
    answers: []
  }),

  SCORE: {
    RIGHT_ANSWER: 100,
    BONUS_ANSWER: 50,
    ONE_LIFE_SCORE: 50,
    QUICK_ANSWER: 20, // sec
    SLOW_ANSWER: 10
  },

  populateAnswers(completed, timeSpent, length) {
    const answers = [];

    for (let index = 0; index < length; index++) {
      answers.push({
        completed,
        timeSpent
      });
    }
    return answers;
  },

  addAnswerA(answers, completed, timeSpent) {
    return answers.concat({
      completed,
      timeSpent
    });
  },

  calculateScore(answers, lives) {
    if (answers.length < 10) {
      return -1;
    }
    return answers.reduce((score, it) => {
      if (it.timeSpent >= this.SCORE.QUICK_ANSWER) {
        score += this.SCORE.BONUS_ANSWER;
      }

      if (it.timeSpent <= this.SCORE.SLOW_ANSWER) {
        score -= this.SCORE.BONUS_ANSWER;
      }

      if (it.completed) {
        score += this.SCORE.RIGHT_ANSWER;
      }
      return score;
    }, lives * this.SCORE.ONE_LIFE_SCORE);
  },

  checkLevel(level) {
    if (typeof level !== `number`) {
      throw new Error(`Level should be typeof number`);
    }
    if (level < 0) {
      throw new Error(`Level should not be negative value`);
    }

    if (level === game.length) {
      return -1;
    }
    return level;
  },

  changeLevel(state) {
    return Object.assign({}, state, {
      level: state.level + 1,
      time: this.initialState.time
    });
  },

  setLives(state) {
    return Object.assign({}, state, {
      lives: state.lives - 1
    });
  },

  addAnswer(state, completed, timeSpent) {
    return Object.assign({}, state, {
      answers: this.addAnswerA(state.answers, completed, timeSpent)
    });
  },

  setTime(time) {
    if (time === 0) {
      throw new Error(`Time is over`);
    }
    if (time > 30) {
      throw new Error(`Time limit is 30 seconds`);
    }
    return time;
  },

  tick(state) {
    return Object.assign({}, state, {
      time: state.time - 1
    });
  },

  checkLives(lives) {
    if (typeof lives !== `number`) {
      throw new Error(`Life should be typeof number`);
    }

    if (lives < 0 || lives > 3) {
      throw new Error(`Cant have less than 0 or more than 3 lives`);
    }
    return lives;
  }
};

export default data;
