import { useQuiz } from "@hooks/useQuiz";
import styles from "./Quiz.module.css";

const MIN_VISIBLE_STREAK = 2;

export default function StreakCounter() {
  const { streak } = useQuiz();
  if (streak < MIN_VISIBLE_STREAK) return null;
  return (
    <div className={styles.streak} aria-live="polite" data-testid="streak">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M13.5 1.5s.9 3.1-1.3 5.9C10.6 9.4 8 10.8 8 14.5A4.5 4.5 0 0 0 12.5 19c2.9 0 4.5-2.2 4.5-4.8 0-1.6-.6-2.8-1.4-3.8.2 1.4-.4 2.6-1.4 3.1.4-2.5-.3-6.9-.7-12zM6 13c-.6 1-1 2.3-1 3.6C5 20.1 8.1 23 12 23s7-2.9 7-6.4c0-.4 0-.7-.1-1.1-.8 2.8-3.4 4.9-6.4 4.9-3.7 0-6.6-2.9-6.5-7.4z" />
      </svg>
      Streak: {streak} corecte la rând
    </div>
  );
}
