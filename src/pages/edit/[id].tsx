import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField } from "@mui/material";
import PageLayout from "@/components/layouts/PageLayout";
import { Quiz } from "@/models/quiz";
import { api } from "@/api";
import Canvas from "@/components/quizEditor/Canvas";
import PropertiesPanel from "@/components/quizEditor/PropertiesPanel";
import BlocksSidebar from "@/components/quizEditor/BlocksSideBar";

export default function QuizEditorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    api
      .get<Quiz>(`/quizzes/${id}`)
      .then((res) => {
        if (!res.data) {
          router.replace("/404");
        } else {
          setQuiz(res.data);
        }
      })
      .catch(() => {
        router.replace("/404");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (!quiz) return <p>Loading...</p>;

  const handleQuizChange = async (updated: Quiz) => {
    setQuiz(updated);
  };

  const handleQuizSave = async () => {
    try {
      const res = await api.put<Quiz>(`/quizzes/${quiz.id}`, {
        ...quiz,
        updatedAt: new Date().toISOString(),
      });
      setQuiz(res.data);

      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const newQuizzes = quizzes.map((q: Quiz) => (q.id === quiz.id ? res.data : q));
      localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
      alert("Quiz saved!");
      router.push("/");
    } catch (error) {
      alert("Failed to save quiz.");
    }
  };

  const handleQuizPublish = async () => {
    try {
      const res = await api.put<Quiz>(`/quizzes/${quiz.id}`, {
        ...quiz,
        published: true,
        updatedAt: new Date().toISOString(),
      });
      setQuiz(res.data);

      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const newQuizzes = quizzes.map((q: Quiz) => (q.id === quiz.id ? res.data : q));
      localStorage.setItem("quizzes", JSON.stringify(newQuizzes));

      alert("Quiz published!");
      router.push(`/quiz/${quiz.id}`);
    } catch (error) {
      alert("Failed to publish quiz.");
    }
  };

  const handleGoHome = () => router.push("/");

  return (
    <PageLayout
      title={
        <TextField
          label="Quiz Title"
          variant="outlined"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          onBlur={() => handleQuizChange({ ...quiz, updatedAt: new Date().toISOString() })}
          size="small"
          sx={{ width: 300 }}
        />
      }
      actions={
        <>
          <Button variant="outlined" onClick={handleGoHome} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button variant="outlined" onClick={handleQuizSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button variant="contained" onClick={handleQuizPublish}>
            Publish
          </Button>
        </>
      }
    >
      <Box display="flex" height="calc(100vh - 64px)">
        <BlocksSidebar quiz={quiz} onQuizSave={handleQuizChange} />
        <Canvas
          quiz={quiz}
          selectedBlockId={selectedBlockId}
          onQuizSave={handleQuizChange}
          setSelectedBlockId={setSelectedBlockId}
        />
        <PropertiesPanel
          quiz={quiz}
          selectedBlockId={selectedBlockId}
          onQuizChange={handleQuizChange}
        />
      </Box>
    </PageLayout>
  );
}
