import { Quiz } from "@/models/quiz";

const sampleQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Sample Quiz 1",
    blocks: [
      { id: "b1", type: "heading", content: { text: "Welcome to Quiz 1" } },
      {
        id: "b2",
        type: "question",
        content: {
          question: "What is 2+2?",
          questionType: "multiple-choice",
          options: ["3", "4", "5"],
          multiple: false,
        },
      },
    ],
    published: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sample Quiz 2",
    blocks: [
      { id: "b3", type: "heading", content: { text: "Welcome to Quiz 2" } },
      {
        id: "b4",
        type: "question",
        content: {
          question: "Write your favorite color:",
          questionType: "text",
          placeholder: "Type here...",
          answer: "",
        },
      },
    ],
    published: true,
    updatedAt: new Date().toISOString(),
  },
];

export default sampleQuizzes;
