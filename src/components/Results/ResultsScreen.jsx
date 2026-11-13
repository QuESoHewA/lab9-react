import { useQuiz } from "@hooks/useQuiz";
import Button from "@components/Button/Button";
import ScoreSummary from "./ScoreSummary";
import CategoryStats from "./CategoryStats";
import ReviewList from "./ReviewList";
import HistoryTable from "./HistoryTable";
import styles from "./Results.module.css";

export default function ResultsScreen() {
  const { retry, reset } = useQuiz();
  return (
    <div className={styles.screen}>
      <ScoreSummary />
      <div className={styles.actions}>
        <Button onClick={retry}>Încearcă din nou</Button>
        <Button variant="secondary" onClick={reset}>
          Înapoi la pagina de start
        </Button>
      </div>
      <CategoryStats />
      <ReviewList />
      <HistoryTable />
    </div>
  );
}
