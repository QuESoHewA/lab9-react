export const ACTIONS = {
  START_QUIZ: "START_QUIZ",
  ANSWER_QUESTION: "ANSWER_QUESTION",
  NEXT_QUESTION: "NEXT_QUESTION",
  RESET: "RESET",
};

export const initialQuizState = {
  phase: "start",
  sessionId: null,
  config: null,
  questions: [],
  current: 0,
  answers: [],
  streak: 0,
  maxStreak: 0,
  finishedAt: null,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_QUIZ: {
      const { sessionId, config, questions } = action.payload;
      return { ...initialQuizState, phase: "quiz", sessionId, config, questions };
    }

    case ACTIONS.ANSWER_QUESTION: {
      if (state.phase !== "quiz" || state.answers.length > state.current) return state;
      const question = state.questions[state.current];
      const selected = action.payload.selected;
      const isCorrect = selected === question.answer;
      const streak = isCorrect ? state.streak + 1 : 0;
      return {
        ...state,
        answers: [...state.answers, { questionId: question.id, selected, isCorrect, timedOut: selected === null }],
        streak,
        maxStreak: Math.max(state.maxStreak, streak),
      };
    }

    case ACTIONS.NEXT_QUESTION: {
      if (state.phase !== "quiz" || state.answers.length <= state.current) return state;
      if (state.current + 1 >= state.questions.length) {
        return { ...state, phase: "results", finishedAt: Date.now() };
      }
      return { ...state, current: state.current + 1 };
    }

    case ACTIONS.RESET:
      return initialQuizState;

    default:
      return state;
  }
}
