import { memo } from "react";
import styles from "./Badge.module.css";

const DIFFICULTY_TONE = { ușor: "success", mediu: "warning", dificil: "danger" };

function Badge({ children, tone = "neutral" }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}

export function DifficultyBadge({ difficulty }) {
  return <Badge tone={DIFFICULTY_TONE[difficulty]}>{difficulty}</Badge>;
}

export default memo(Badge);
