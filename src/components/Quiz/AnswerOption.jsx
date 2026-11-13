import { memo, useCallback } from "react";
import styles from "./Quiz.module.css";

function AnswerOption({ letter, option, status, disabled, onSelect }) {
  const handleClick = useCallback(() => onSelect(option), [onSelect, option]);
  return (
    <button
      type="button"
      className={`${styles.option} ${styles[status]}`}
      onClick={handleClick}
      disabled={disabled}
      data-status={status}
    >
      <span className={styles.letter}>{letter}</span>
      <span className={styles.optionText}>{option}</span>
    </button>
  );
}

export default memo(AnswerOption);
