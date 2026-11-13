import { ThemeProvider } from "@context/ThemeProvider";
import { QuizProvider } from "@context/QuizProvider";
import { useQuiz } from "@hooks/useQuiz";
import Header from "@components/Header/Header";
import StartScreen from "@components/StartScreen/StartScreen";
import QuizScreen from "@components/Quiz/QuizScreen";
import ResultsScreen from "@components/Results/ResultsScreen";
import styles from "./App.module.css";

function Screen() {
  const { phase } = useQuiz();
  if (phase === "quiz") return <QuizScreen />;
  if (phase === "results") return <ResultsScreen />;
  return <StartScreen />;
}

export default function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <div className={styles.app}>
          <Header />
          <main className={styles.main}>
            <Screen />
          </main>
        </div>
      </QuizProvider>
    </ThemeProvider>
  );
}
