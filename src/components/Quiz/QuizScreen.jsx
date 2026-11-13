import { useEffect } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import Badge, { DifficultyBadge } from "@components/Badge/Badge";
import Button from "@components/Button/Button";
import QuizProgress from "./QuizProgress";
import QuestionTimer from "./QuestionTimer";
import StreakCounter from "./StreakCounter";
import AnswerOption from "./AnswerOption";
import Feedback from "./Feedback";
import styles from "./Quiz.module.css";

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const TIMEOUT_ADVANCE_MS = 2000;

function optionStatus(option, question, answer) {
  if (!answer) return "idle";
  if (option === question.answer) return "correct";
  if (option === answer.selected) return "wrong";
  return "dimmed";
}

export default function QuizScreen() {
  const { current, config, currentQuestion: question, currentAnswer: answer, answerQuestion, nextQuestion, reset } =
    useQuiz();

  // La expirarea timpului se avansează automat la următoarea întrebare.
  useEffect(() => {
    if (!answer?.timedOut) return undefined;
    const id = setTimeout(nextQuestion, TIMEOUT_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [answer, nextQuestion]);

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <QuizProgress />
        <StreakCounter />
      </div>

      <div className={styles.meta}>
        <div className={styles.badges}>
          <Badge>{question.category}</Badge>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        {config.timeLimit > 0 && <QuestionTimer key={current} />}
      </div>

      <h2 className={styles.question}>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((option, i) => (
          <AnswerOption
            key={option}
            letter={LETTERS[i]}
            option={option}
            status={optionStatus(option, question, answer)}
            disabled={Boolean(answer)}
            onSelect={answerQuestion}
          />
        ))}
      </div>

      <Feedback />

      <div className={styles.footer}>
        <Button variant="ghost" onClick={reset}>
          Abandonează și revino la start
        </Button>
      </div>
    </Card>
  );
}
