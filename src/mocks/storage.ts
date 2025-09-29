import { Quiz } from "../models/quiz";

const STORAGE_KEY = "quizzes";

export function loadQuizzes(): Quiz[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Quiz[];
  } catch (err) {
    console.warn(`Invalid quizzes in localStorage, resetting…`, err);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}
export function saveQuizzes(quizzes: Quiz[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}
