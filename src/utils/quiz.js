import allQuestions from "@data/questions.json";

export const ALL = "all";
export const COUNT_STEPS = [5, 10, 15, 20];
export const TIME_OPTIONS = [
  { value: 0, label: "Nelimitat" },
  { value: 10, label: "10 secunde" },
  { value: 15, label: "15 secunde" },
  { value: 20, label: "20 secunde" },
  { value: 30, label: "30 secunde" },
];

export const QUESTIONS = allQuestions;
export const CATEGORIES = [...new Set(allQuestions.map((q) => q.category))];

export function questionsFor(category) {
  return category === ALL ? QUESTIONS : QUESTIONS.filter((q) => q.category === category);
}

export function countOptionsFor(category) {
  const available = questionsFor(category).length;
  const steps = COUNT_STEPS.filter((n) => n < available).map((n) => ({ value: n, label: `${n} întrebări` }));
  return [...steps, { value: ALL, label: `Toate (${available})` }];
}

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildQuestions({ category, count }) {
  const pool = shuffle(questionsFor(category));
  const picked = count === ALL ? pool : pool.slice(0, count);
  return picked.map((q) => ({ ...q, options: shuffle(q.options) }));
}

export function categoryLabel(category) {
  return category === ALL ? "Toate categoriile" : category;
}

export function percent(correct, total) {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
