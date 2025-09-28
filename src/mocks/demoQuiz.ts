import { Block } from "@/models/quiz";

export const demoQuiz: Block[] = [
  {
    id: "1",
    type: "heading",
    content: { text: "General Knowledge Quiz" },
  },
  {
    id: "2",
    type: "question",
    content: {
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Bengaluru", "Kolkata"],
      multiple: false,
    },
  },
  {
    id: "3",
    type: "question",
    content: {
      question: "Which of these are programming languages?",
      options: ["Python", "Banana", "JavaScript", "C++"],
      multiple: true,
    },
  },
  {
    id: "4",
    type: "button",
    content: { label: "Submit" },
  },
  {
    id: "5",
    type: "footer",
    content: { text: "Good luck with the quiz!" },
  },
];
