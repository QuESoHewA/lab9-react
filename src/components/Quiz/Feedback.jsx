import { useQuiz } from "@hooks/useQuiz";
import Button from "@components/Button/Button";
import styles from "./Quiz.module.css";

export default function Feedback() {
  const { currentQuestion, currentAnswer, current, questions, nextQuestion } = useQuiz();
  if (!currentAnswer) return null;

  const isLast = current + 1 === questions.length;
  let tone = "success";
  let message = "Corect! Bravo!";
  if (currentAnswer.timedOut) {
    tone = "danger";
    message = "Timpul a expirat! Întrebarea a fost marcată ca greșită.";
  } else if (!currentAnswer.isCorrect) {
    tone = "danger";
    message = "Greșit!";
  }

  return (
    <div className={`${styles.feedback} ${styles[`feedback_${tone}`]}`} role="status" data-testid="feedback">
      <div>
        <p className={styles.feedbackTitle}>{message}</p>
        {!currentAnswer.isCorrect && (
          <p className={styles.feedbackText}>
            Răspunsul corect: <strong>{currentQuestion.answer}</strong>
          </p>
        )}
      </div>
      <Button onClick={nextQuestion}>{isLast ? "Vezi rezultatele" : "Următoarea întrebare"}</Button>
    </div>
  );
}
