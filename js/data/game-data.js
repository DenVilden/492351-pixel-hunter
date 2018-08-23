export const data = {
  GAME_STATUS: Object.freeze({
    level: 1,
    lives: 3,
    time: 30
  }),

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
    const RIGHT_ANSWER = 100;
    const QUICK_ANSWER = 50;
    const SLOW_ANSWER = 50;
    const ONE_LIFE_SCORE = 50;

    let score = 0;

    if (answers.length < 10) {
      return -1;
    }

    answers.forEach((answer) => {
      if (answer.completed) {
        score += RIGHT_ANSWER;
      }
      if (answer.completed && answer.timeSpent < 10) {
        score += QUICK_ANSWER;
      }
      if (answer.completed && answer.timeSpent > 20) {
        score -= SLOW_ANSWER;
      }
    });
    // Возвращает очки + очки за жизни
    return score + this.setLives(lives) * ONE_LIFE_SCORE;
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
