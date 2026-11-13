import { useCallback, useEffect, useMemo } from "react";
import { QuizContext } from "./QuizContext";
import { ACTIONS, initialQuizState, quizReducer } from "./quizReducer";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { usePersistentReducer } from "@hooks/usePersistentReducer";
import { buildQuestions, percent } from "@utils/quiz";

const SESSION_KEY = "quiz-session";
const HISTORY_KEY = "quiz-history";

const isActiveSession = (state) => state.phase !== "start";

export function QuizProvider({ children }) {
  const [state, dispatch] = usePersistentReducer(quizReducer, SESSION_KEY, initialQuizState, isActiveSession);
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, []);

  // La finalizarea quiz-ului, rezultatul se adaugă o singură dată în istoric.
  useEffect(() => {
    if (state.phase !== "results") return;
    const correct = state.answers.filter((a) => a.isCorrect).length;
    const entry = {
      id: state.sessionId,
      username: state.config.username,
      category: state.config.category,
      correct,
      total: state.questions.length,
      percent: percent(correct, state.questions.length),
      maxStreak: state.maxStreak,
      date: state.finishedAt,
    };
    setHistory((prev) => (prev.some((h) => h.id === entry.id) ? prev : [...prev, entry]));
  }, [state, setHistory]);

  const startQuiz = useCallback(
    (config) => {
      dispatch({
        type: ACTIONS.START_QUIZ,
        payload: { sessionId: crypto.randomUUID(), config, questions: buildQuestions(config) },
      });
    },
    [dispatch]
  );

  const answerQuestion = useCallback(
    (selected) => dispatch({ type: ACTIONS.ANSWER_QUESTION, payload: { selected } }),
    [dispatch]
  );

  const timeUp = useCallback(() => dispatch({ type: ACTIONS.ANSWER_QUESTION, payload: { selected: null } }), [dispatch]);

  const nextQuestion = useCallback(() => dispatch({ type: ACTIONS.NEXT_QUESTION }), [dispatch]);

  const reset = useCallback(() => dispatch({ type: ACTIONS.RESET }), [dispatch]);

  const retry = useCallback(() => {
    if (state.config) startQuiz(state.config);
  }, [state.config, startQuiz]);

  const value = useMemo(
    () => ({
      ...state,
      currentQuestion: state.questions[state.current] ?? null,
      currentAnswer: state.answers[state.current] ?? null,
      history,
      startQuiz,
      answerQuestion,
      timeUp,
      nextQuestion,
      reset,
      retry,
    }),
    [state, history, startQuiz, answerQuestion, timeUp, nextQuestion, reset, retry]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
