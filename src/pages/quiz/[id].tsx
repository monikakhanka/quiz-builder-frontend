import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../api";
import { Quiz } from "../../models/quiz";
import AppLayout from "../../components/layouts/AppLayout";

export default function QuizRenderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
    }
  }, [id]);

  if (!quiz) return <p>Loading...</p>;
  if (!quiz.published) return <p>Not published yet</p>;

  return (
    <AppLayout>
      <h1>{quiz.title}</h1>
      {quiz.blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return <h2 key={block.id}>{block.content.text}</h2>;
          case "question":
            return <p key={block.id}>[Question Placeholder]</p>;
          case "button":
            return <button key={block.id}>{block.content.label}</button>;
          case "footer":
            return <small key={block.id}>{block.content.text}</small>;
          default:
            return null;
        }
      })}
    </AppLayout>
  );
}
