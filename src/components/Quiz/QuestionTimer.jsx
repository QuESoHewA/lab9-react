import { useQuiz } from "@hooks/useQuiz";
import { useTimer } from "@hooks/useTimer";
import styles from "./Quiz.module.css";

const WARNING_SECONDS = 5;

export default function QuestionTimer() {
  const { config, currentAnswer, timeUp } = useQuiz();
  const { secondsLeft, progress } = useTimer(config.timeLimit, { active: !currentAnswer, onExpire: timeUp });
  const urgent = secondsLeft <= WARNING_SECONDS;

  return (
    <div className={`${styles.timer} ${urgent ? styles.timerUrgent : ""}`} aria-label={`Timp rămas: ${secondsLeft} secunde`}>
      <svg viewBox="0 0 36 36" className={styles.timerRing} aria-hidden="true">
        <circle cx="18" cy="18" r="15.5" className={styles.timerBg} />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          className={styles.timerArc}
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progress * 100}
        />
      </svg>
      <span className={styles.timerValue} data-testid="timer">
        {secondsLeft}s
      </span>
    </div>
  );
}
