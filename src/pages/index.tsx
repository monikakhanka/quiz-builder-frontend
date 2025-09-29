import { useEffect } from "react";
import { api } from "../api";
import { Quiz, QuizzesSchema } from "../models/quiz";
import Link from "next/link";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LocalDate from "@/components/ui/LocalDate";
import PageLayout from "@/components/layouts/PageLayout";
import sampleQuizzes from "@/mocks/demoQuiz";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>("quizzes", sampleQuizzes, QuizzesSchema);
  const router = useRouter();

  useEffect(() => {
    if (quizzes.length === 0) {
      setQuizzes(sampleQuizzes);
    }
  }, [quizzes, setQuizzes]);

  useEffect(() => {
    api
      .get<Quiz[]>("/quizzes")
      .then((res) => {
        setQuizzes((prev) => {
          const existingIds = new Set(prev.map((q) => q.id));
          const merged = [...prev, ...res.data.filter((q) => !existingIds.has(q.id))];
          return merged;
        });
      })
      .catch(() => toast.error("Failed to load quizzes"));
  }, [setQuizzes]);

  const handleCreate = async () => {
    try {
      const res = await api.post<Quiz>("/quizzes", { title: "New Quiz" });
      setQuizzes((prev) => {
        const updated = [...prev, res.data];
        localStorage.setItem("quizzes", JSON.stringify(updated));
        return updated;
      });
      toast.success("Quiz created successfully");
      router.push(`/edit/${res.data.id}`);
    } catch {
      toast.error("Failed to create quiz");
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await api.delete(`/quizzes/${id}`);

      const updated = quizzes.filter((q) => q.id !== id);
      setQuizzes(updated);
      localStorage.setItem("quizzes", JSON.stringify(updated));

      toast.success("Quiz deleted successfully");
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };
  return (
    <PageLayout
      title="Quizzes"
      actions={
        <Button variant="contained" onClick={handleCreate}>
          Create Quiz
        </Button>
      }
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>
                <LocalDate date={quiz.updatedAt} />
              </TableCell>
              <TableCell>
                <Link href={`/edit/${quiz.id}`}>Edit</Link> |{" "}
                <Link href={`/quiz/${quiz.id}`}>View</Link> |
                <Button
                  color="error"
                  variant="text"
                  onClick={() => handleDelete(quiz.id)}
                  sx={{
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    ml: 1,
                    background: "none",
                    textDecoration: "underline",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                    "&:active": {
                      background: "none",
                    },
                    "&:focus": {
                      background: "none",
                    },
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
