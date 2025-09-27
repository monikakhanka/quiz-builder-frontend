import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../api";
import { Quiz } from "../../models/quiz";
import PageLayout from "@/components/layouts/PageLayout";
import { Button } from "@mui/material";

export default function QuizRenderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (id) {
      api.get<Quiz>(`/quizzes/${id}`).then((res) => setQuiz(res.data));
    }
  }, [id]);

  const handleGoBack = () => {
    router.push("/");
  };
  return (
    <PageLayout
      title="Quiz Viewer"
      actions={
        <Button variant="contained" onClick={handleGoBack}>
          HOME
        </Button>
      }
    >
      {!quiz ? (
        <p>Loading...</p>
      ) : !quiz.published ? (
        <p>Not published yet</p>
      ) : (
        <>
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
        </>
      )}
    </PageLayout>
  );
}
