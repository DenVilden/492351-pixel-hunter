export const data = {
  GAME_STATUS: Object.freeze({
    level: 1,
    lives: 3,
    time: 30
  }),

  SCORE: {
    RIGHT_ANSWER: 100,
    BONUS_ANSWER: 50,
    ONE_LIFE_SCORE: 50,
    SLOW_ANSWER: 20, // в секундах
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
  calculateScore(answers, lives) {
    if (answers.length < 10) {
      return -1;
    }
    // Возвращает очки + очки за жизни
    return answers.reduce((score, answer) => {
      if (answer.completed) {
        score += this.SCORE.RIGHT_ANSWER;
      }
      if (answer.completed && answer.timeSpent < this.SCORE.QUICK_ANSWER) {
        score += this.SCORE.BONUS_ANSWER;
      }
      if (answer.completed && answer.timeSpent > this.SCORE.SLOW_ANSWER) {
        score -= this.SCORE.BONUS_ANSWER;
      }
      return score;
    }, this.setLives(lives) * this.SCORE.ONE_LIFE_SCORE);
  },
  changeLevel(level) {
    if (typeof level !== `number`) {
      throw new Error(`Level should be typeof number`);
    }
    if (level < 0) {
      throw new Error(`Level should not be negative value`);
    }

    const newLevel = Object.assign({}, this.GAME_STATUS, {
      level
    });
    return newLevel.level;
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
  setLives(lives) {
    if (lives === 0) {
      throw new Error(`Game is over, no more lives`);
    }
    if (lives < 0 || lives > 3) {
      throw new Error(`Cant have less than 0 or more than 3 lives`);
    }

    const newLives = Object.assign({}, this.GAME_STATUS, {
      lives
    });
    return newLives.lives;
  }
};
