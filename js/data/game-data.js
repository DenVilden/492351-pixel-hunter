const gameData = {
  initialState: {
    level: 0,
    lives: 3,
    time: 30,
    answers: []
  },

  SCORE: {
    RIGHT_ANSWER: 100,
    BONUS_ANSWER: 50,
    ONE_LIFE_SCORE: 50,
    QUICK_ANSWER: 20, // sec
    SLOW_ANSWER: 10
  },

  getAnswer(timeSpent, completed) {
    if (completed === false) {
      return `wrong`;
    }

    if (timeSpent >= this.SCORE.QUICK_ANSWER) {
      return `fast`;
    }

    if (timeSpent <= this.SCORE.SLOW_ANSWER) {
      return `slow`;
    }

    if (completed === true) {
      return `correct`;
    }
    return null;
  },

  calculateTotalScore(answers, lives) {
    return answers.reduce((score, it) => {
      if (it.completed !== `wrong`) {
        score += this.SCORE.RIGHT_ANSWER;
      }

      if (it.completed === `fast`) {
        score += this.SCORE.BONUS_ANSWER;
      }

      if (it.completed === `slow`) {
        score -= this.SCORE.BONUS_ANSWER;
      }

      return score;
    }, lives * this.SCORE.ONE_LIFE_SCORE);
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

  pushAnswer(answers, completed, timeSpent) {
    return answers.concat(this.getAnswer(timeSpent, completed));
  },

  addAnswer(state, completed, timeSpent) {
    return Object.assign({}, state, {
      answers: this.pushAnswer(state.answers, completed, timeSpent)
    });
  },

  tick(state) {
    return Object.assign({}, state, {
      time: state.time - 1
    });
  },

  getFinalStats(state) {
    return {
      stats: state.answers,
      lives: state.lives,
      score: this.calculateTotalScore(state.answers, state.lives)
    };
  }
};

export default gameData;
