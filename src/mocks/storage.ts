import { Quiz } from "../models/quiz";

const STORAGE_KEY = "quizzes";

export function loadQuizzes(): Quiz[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveQuizzes(quizzes: Quiz[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}
