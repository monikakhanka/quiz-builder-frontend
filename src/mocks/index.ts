import MockAdapter from "axios-mock-adapter";
import { api } from "../api";
import { Quiz } from "../models/quiz";
import { loadQuizzes, saveQuizzes } from "./storage";

const mock = new MockAdapter(api, { delayResponse: 500 });

const quizzes: Quiz[] = loadQuizzes();

mock.onGet("/quizzes").reply(() => {
  return [200, quizzes];
});

mock.onPost("/quizzes").reply((config) => {
  const newQuiz: Quiz = {
    id: Date.now().toString(),
    title: "Untitled Quiz",
    blocks: [],
    published: false,
    updatedAt: new Date().toISOString(),
    ...JSON.parse(config.data),
  };
  quizzes.push(newQuiz);
  saveQuizzes(quizzes);
  return [200, newQuiz];
});

mock.onPut(/\/quizzes\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const idx = quizzes.findIndex((q) => q.id === id);
  if (idx === -1) return [404];
  quizzes[idx] = { ...quizzes[idx], ...JSON.parse(config.data) };
  saveQuizzes(quizzes);
  return [200, quizzes[idx]];
});

mock.onGet(/\/quizzes\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const quiz = quizzes.find((q) => q.id === id);
  return quiz ? [200, quiz] : [404];
});

mock.onDelete(/\/quizzes\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const idx = quizzes.findIndex((q) => q.id === id);
  if (idx === -1) return [404, { message: "Quiz not found" }];

  quizzes.splice(idx, 1);
  saveQuizzes(quizzes);
  return [200, { message: "Quiz deleted" }];
});

export default mock;
