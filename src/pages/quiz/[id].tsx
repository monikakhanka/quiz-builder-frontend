import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../api";
import { Quiz } from "../../models/quiz";
import PageLayout from "@/components/layouts/PageLayout";
import { Box, Button, CircularProgress } from "@mui/material";
import QuizContent from "@/components/quiz/QuizContent";

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
          Home
        </Button>
      }
    >
      {!quiz ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <QuizContent quiz={quiz} />
      )}
    </PageLayout>
  );
}
