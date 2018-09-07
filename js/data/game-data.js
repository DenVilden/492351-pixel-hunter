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
    SLOW_ANSWER: 20, // secs
    QUICK_ANSWER: 10
  },

  populateAnswers(completed, timeSpent, length) {
    const answers = [];

    for (let index = 0; index < length; index++) {
      answers.push({
        completed,
        timeSpent: this.setTime(timeSpent)
      });
    }
    return answers;
  },

  addAnswer(answers, completed, timeSpent) {
    return answers.concat({
      completed,
      timeSpent
    });
  },

  calculateScore(answers, lives) {
    if (answers.length < 10) {
      return -1;
    }
    // Return total score
    return answers.reduce((score, it) => {
      if (it.completed) {
        score += this.SCORE.RIGHT_ANSWER;
      }
      if (it.completed && it.timeSpent < this.SCORE.QUICK_ANSWER) {
        score += this.SCORE.BONUS_ANSWER;
      }
      if (it.completed && it.timeSpent > this.SCORE.SLOW_ANSWER) {
        score -= this.SCORE.BONUS_ANSWER;
      }
      return score;
    }, lives * this.SCORE.ONE_LIFE_SCORE);
  },

  changeLevel(level) {
    if (typeof level !== `number`) {
      throw new Error(`Level should be typeof number`);
    }
    if (level < 0) {
      throw new Error(`Level should not be negative value`);
    }
    return level;
  },

  setTime(time) {
    if (time === 0) {
      throw new Error(`Time is over`);
    }
    if (time > 30) {
      throw new Error(`Time limit is 30 seconds`);
    }

    const newTimer = Object.assign({}, this.GAME_STATUS, {
      time
    });
    return newTimer.time;
  },

  setLives(live) {
    if (typeof live !== `number`) {
      throw new Error(`Level should be typeof number`);
    }

    if (live < 0 || live > 3) {
      throw new Error(`Cant have less than 0 or more than 3 lives`);
    }
    return live;
  }
};

export default data;
