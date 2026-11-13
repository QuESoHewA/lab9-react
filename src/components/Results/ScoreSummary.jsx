import { useMemo } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import { categoryLabel, percent } from "@utils/quiz";
import styles from "./Results.module.css";

function verdict(pct) {
  if (pct === 100) return "Perfect! Ai răspuns corect la toate întrebările.";
  if (pct >= 80) return "Excelent! Cunoștințe foarte bune.";
  if (pct >= 50) return "Bine! Mai ai puțin până la excelență.";
  return "Mai exersează — data viitoare va fi mai bine!";
}

export default function ScoreSummary() {
  const { answers, questions, maxStreak, config } = useQuiz();
  const correct = useMemo(() => answers.filter((a) => a.isCorrect).length, [answers]);
  const pct = percent(correct, questions.length);

  return (
    <Card className={styles.summary}>
      <div className={styles.scoreRing} style={{ "--pct": pct }} data-testid="percent">
        <span>{pct}%</span>
      </div>
      <div className={styles.summaryBody}>
        <p className={styles.eyebrow}>
          {config.username} · {categoryLabel(config.category)}
        </p>
        <h1 className={styles.score} data-testid="score">
          {correct} / {questions.length} răspunsuri corecte
        </h1>
        <p className={styles.muted}>{verdict(pct)}</p>
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span className={styles.kpiValue} data-testid="max-streak">
              {maxStreak}
            </span>
            <span className={styles.kpiLabel}>Streak maxim</span>
          </div>
          <div className={styles.kpi}>
            <span className={styles.kpiValue}>{questions.length - correct}</span>
            <span className={styles.kpiLabel}>Greșite</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
