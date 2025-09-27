import { useRouter } from "next/router";
import PageLayout from "@/components/layouts/PageLayout";
import { Button } from "@mui/material";

import { Quiz } from "../../models/quiz";
import { useEffect, useState } from "react";
import { api } from "@/api";

export default function QuizEditorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  useEffect(() => {
    if (id) {
      api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
    }
  }, [id]);

  const handleGoBack = () => {
    router.push("/");
  };

  if (!quiz) return <p>Loading...</p>;
  return (
    <PageLayout
      title={`Editing: ${quiz.title}`}
      actions={
        <Button variant="contained" onClick={handleGoBack}>
          HOME
        </Button>
      }
    >
      <p>Start Editing</p>
    </PageLayout>
  );
}
