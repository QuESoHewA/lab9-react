import { memo } from "react";
import Badge, { DifficultyBadge } from "@components/Badge/Badge";
import styles from "./Results.module.css";

function ReviewCard({ index, question, category, difficulty, selected, correctAnswer, isCorrect, timedOut }) {
  return (
    <li className={`${styles.review} ${isCorrect ? styles.reviewCorrect : styles.reviewWrong}`} data-testid="review-card">
      <div className={styles.reviewHead}>
        <span className={styles.reviewIndex}>#{index}</span>
        <Badge>{category}</Badge>
        <DifficultyBadge difficulty={difficulty} />
        <span className={`${styles.reviewStatus} ${isCorrect ? styles.ok : styles.ko}`}>
          {isCorrect ? "Corect" : "Greșit"}
        </span>
      </div>
      <p className={styles.reviewQuestion}>{question}</p>
      <p className={styles.reviewLine}>
        Răspunsul tău:{" "}
        <strong className={isCorrect ? styles.ok : styles.ko}>
          {timedOut ? "Niciun răspuns (timpul a expirat)" : selected}
        </strong>
      </p>
      {!isCorrect && (
        <p className={styles.reviewLine}>
          Răspunsul corect: <strong className={styles.ok}>{correctAnswer}</strong>
        </p>
      )}
    </li>
  );
}

export default memo(ReviewCard);
