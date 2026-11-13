import { useCallback, useId, useMemo, useState } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import ReviewCard from "./ReviewCard";
import { ALL } from "@utils/quiz";
import styles from "./Results.module.css";

const TABS = [
  { value: "all", label: "Toate" },
  { value: "correct", label: "Corecte" },
  { value: "wrong", label: "Greșite" },
];

export default function ReviewList() {
  const { questions, answers } = useQuiz();
  const id = useId();
  const [tab, setTab] = useState("all");
  const [category, setCategory] = useState(ALL);

  const items = useMemo(
    () => questions.map((q, i) => ({ index: i + 1, question: q, answer: answers[i] })).filter((it) => it.answer),
    [questions, answers]
  );

  const categories = useMemo(() => [...new Set(items.map((it) => it.question.category))], [items]);

  const byCategory = useMemo(
    () => (category === ALL ? items : items.filter((it) => it.question.category === category)),
    [items, category]
  );

  const counts = useMemo(() => {
    const correct = byCategory.filter((it) => it.answer.isCorrect).length;
    return { all: byCategory.length, correct, wrong: byCategory.length - correct };
  }, [byCategory]);

  const visible = useMemo(() => {
    if (tab === "correct") return byCategory.filter((it) => it.answer.isCorrect);
    if (tab === "wrong") return byCategory.filter((it) => !it.answer.isCorrect);
    return byCategory;
  }, [byCategory, tab]);

  const handleCategory = useCallback((e) => setCategory(e.target.value), []);
  const handleTab = useCallback((e) => setTab(e.currentTarget.dataset.tab), []);

  return (
    <Card>
      <div className={styles.reviewToolbar}>
        <h2 className={styles.sectionTitle}>Revizuirea răspunsurilor</h2>
        <div className={styles.filter}>
          <label htmlFor={`${id}-cat`} className={styles.filterLabel}>
            Categorie
          </label>
          <select id={`${id}-cat`} className={styles.select} value={category} onChange={handleCategory}>
            <option value={ALL}>Toate categoriile</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Filtrează răspunsurile">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            className={`${styles.tab} ${tab === t.value ? styles.tabActive : ""}`}
            data-tab={t.value}
            onClick={handleTab}
          >
            {t.label} <span className={styles.tabCount}>{counts[t.value]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>Nu există răspunsuri pentru filtrele selectate.</p>
      ) : (
        <ul className={styles.reviews}>
          {visible.map(({ index, question, answer }) => (
            <ReviewCard
              key={question.id}
              index={index}
              question={question.question}
              category={question.category}
              difficulty={question.difficulty}
              selected={answer.selected}
              correctAnswer={question.answer}
              isCorrect={answer.isCorrect}
              timedOut={answer.timedOut}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
