import { memo, useMemo } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import { categoryLabel } from "@utils/quiz";
import styles from "./Results.module.css";

const MAX_ROWS = 10;

const dateFormat = new Intl.DateTimeFormat("ro-RO", { dateStyle: "short", timeStyle: "short" });

// compară două încercări: procent mai mare, apoi mai multe răspunsuri corecte, apoi mai devreme
const byPerformance = (a, b) => b.percent - a.percent || b.correct - a.correct || a.date - b.date;

const HistoryRow = memo(function HistoryRow({ rank, username, correct, total, pct, category, attempts, date, isCurrent }) {
  return (
    <tr className={isCurrent ? styles.currentRow : ""} data-testid="history-row">
      <td className={styles.rank}>{rank}</td>
      <td className={styles.user}>{username}</td>
      <td>
        {correct} / {total}
      </td>
      <td>
        <strong>{pct}%</strong>
      </td>
      <td className={styles.hideSm}>{categoryLabel(category)}</td>
      <td className={styles.hideSm}>{attempts}</td>
      <td className={styles.hideSm}>{dateFormat.format(date)}</td>
    </tr>
  );
});

export default function HistoryTable() {
  const { history, config } = useQuiz();

  const rows = useMemo(() => {
    const best = new Map();
    for (const entry of history) {
      const key = entry.username.toLocaleLowerCase("ro");
      const prev = best.get(key);
      const attempts = (prev?.attempts ?? 0) + 1;
      const top = !prev || byPerformance(entry, prev.entry) < 0 ? entry : prev.entry;
      best.set(key, { entry: top, attempts });
    }
    return [...best.values()]
      .sort((a, b) => byPerformance(a.entry, b.entry))
      .slice(0, MAX_ROWS);
  }, [history]);

  const currentUser = config.username.toLocaleLowerCase("ro");

  return (
    <Card>
      <h2 className={styles.sectionTitle}>Istoricul scorurilor</h2>
      <p className={`${styles.muted} ${styles.sectionHint}`}>Cel mai bun scor al fiecărui utilizator, ordonat după performanță.</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Loc</th>
              <th>Utilizator</th>
              <th>Scor</th>
              <th>Procent</th>
              <th className={styles.hideSm}>Categorie</th>
              <th className={styles.hideSm}>Încercări</th>
              <th className={styles.hideSm}>Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ entry, attempts }, i) => (
              <HistoryRow
                key={entry.id}
                rank={i + 1}
                username={entry.username}
                correct={entry.correct}
                total={entry.total}
                pct={entry.percent}
                category={entry.category}
                attempts={attempts}
                date={entry.date}
                isCurrent={entry.username.toLocaleLowerCase("ro") === currentUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
