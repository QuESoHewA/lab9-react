import { useCallback, useId, useMemo, useState } from "react";
import { useQuiz } from "@hooks/useQuiz";
import Card from "@components/Card/Card";
import Button from "@components/Button/Button";
import { ALL, CATEGORIES, QUESTIONS, TIME_OPTIONS, countOptionsFor, questionsFor } from "@utils/quiz";
import styles from "./StartScreen.module.css";

const CATEGORY_CHOICES = [ALL, ...CATEGORIES];

export default function StartScreen() {
  const { startQuiz } = useQuiz();
  const id = useId();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState(ALL);
  const [count, setCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);

  const countOptions = useMemo(() => countOptionsFor(category), [category]);

  const handleNameChange = useCallback((e) => {
    setUsername(e.target.value);
    if (e.target.value.trim()) setError("");
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const next = e.target.value;
    setCategory(next);
    // dacă numărul ales nu mai este disponibil în noua categorie, revenim la "Toate"
    setCount((prev) => (countOptionsFor(next).some((o) => o.value === prev) ? prev : ALL));
  }, []);

  const handleCountChange = useCallback((e) => {
    const value = e.target.value;
    setCount(value === ALL ? ALL : Number(value));
  }, []);

  const handleTimeChange = useCallback((e) => setTimeLimit(Number(e.target.value)), []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const name = username.trim();
      if (!name) {
        setError("Numele de utilizator nu poate fi gol.");
        return;
      }
      startQuiz({ username: name, category, count, timeLimit });
    },
    [username, category, count, timeLimit, startQuiz]
  );

  return (
    <Card className={styles.card}>
      <div className={styles.intro}>
        <h1 className={styles.heading}>Configurează quiz-ul</h1>
        <p className={styles.lead}>
          {QUESTIONS.length} de întrebări din {CATEGORIES.length} categorii, cu niveluri de dificultate diferite. Alege
          setările și testează-ți cunoștințele!
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`} className={styles.label}>
            Nume de utilizator
          </label>
          <input
            id={`${id}-name`}
            className={`${styles.input} ${error ? styles.invalid : ""}`}
            type="text"
            value={username}
            onChange={handleNameChange}
            placeholder="ex. Dorin"
            maxLength={30}
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          {error && (
            <p id={`${id}-error`} className={styles.error} role="alert">
              {error}
            </p>
          )}
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Categoria</legend>
          <div className={styles.categories}>
            {CATEGORY_CHOICES.map((c) => (
              <label key={c} className={`${styles.categoryOption} ${category === c ? styles.selected : ""}`}>
                <input
                  type="radio"
                  name="category"
                  value={c}
                  checked={category === c}
                  onChange={handleCategoryChange}
                  className={styles.radio}
                />
                <span className={styles.categoryName}>{c === ALL ? "Toate" : c}</span>
                <span className={styles.categoryCount}>{questionsFor(c).length} întrebări</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor={`${id}-count`} className={styles.label}>
              Numărul de întrebări
            </label>
            <select id={`${id}-count`} className={styles.input} value={count} onChange={handleCountChange}>
              {countOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor={`${id}-time`} className={styles.label}>
              Timp per întrebare
            </label>
            <select id={`${id}-time`} className={styles.input} value={timeLimit} onChange={handleTimeChange}>
              {TIME_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" className={styles.submit}>
          Începe quiz-ul
        </Button>
      </form>
    </Card>
  );
}
