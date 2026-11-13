import { memo, useMemo } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import { percent } from "@utils/quiz";
import styles from "./Results.module.css";

const StatRow = memo(function StatRow({ category, correct, total }) {
  const pct = percent(correct, total);
  return (
    <li className={styles.statRow} data-testid="category-stat">
      <div className={styles.statHead}>
        <span className={styles.statName}>{category}</span>
        <span className={styles.statValue}>
          {correct} / {total} <span className={styles.muted}>({pct}%)</span>
        </span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
    </li>
  );
});

export default function CategoryStats() {
  const { questions, answers } = useQuiz();

  const stats = useMemo(() => {
    const map = new Map();
    questions.forEach((q, i) => {
      const entry = map.get(q.category) ?? { category: q.category, correct: 0, total: 0 };
      entry.total += 1;
      if (answers[i]?.isCorrect) entry.correct += 1;
      map.set(q.category, entry);
    });
    return [...map.values()].sort((a, b) => a.category.localeCompare(b.category, "ro"));
  }, [questions, answers]);

  return (
    <Card>
      <h2 className={styles.sectionTitle}>Rezultate pe categorii</h2>
      <ul className={styles.stats}>
        {stats.map((s) => (
          <StatRow key={s.category} category={s.category} correct={s.correct} total={s.total} />
        ))}
      </ul>
    </Card>
  );
}
