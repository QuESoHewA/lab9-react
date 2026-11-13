import { useQuiz } from "@hooks/useQuiz";
import styles from "./Quiz.module.css";

export default function QuizProgress() {
  const { current, questions, answers } = useQuiz();
  const done = (answers.length / questions.length) * 100;
  return (
    <div className={styles.progress}>
      <p className={styles.progressText}>
        Întrebarea <strong>{current + 1}</strong> din <strong>{questions.length}</strong>
      </p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={answers.length}
      >
        <div className={styles.progressFill} style={{ width: `${done}%` }} />
      </div>
    </div>
  );
}
