import { useEffect } from "react";
import { api } from "../api";
import { Quiz } from "../models/quiz";
import Link from "next/link";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LocalDate from "@/components/ui/LocalDate";
import PageLayout from "@/components/layouts/PageLayout";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>("quizzes", []);
  const router = useRouter();

  useEffect(() => {
    if (quizzes.length === 0) {
      api
        .get<Quiz[]>("/quizzes")
        .then((res) => setQuizzes(res.data))
        .catch(() => toast.error("Failed to load quizzes"));
    }
  }, [quizzes, setQuizzes]);

  const saveToLocalStorage = (updatedQuizzes: Quiz[]) => {
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  const handleCreate = async () => {
    try {
      const res = await api.post<Quiz>("/quizzes", { title: "New Quiz" });
      setQuizzes((prev) => [...prev, res.data]);
      toast.success("Quiz created successfully");
      router.push(`/edit/${res.data.id}`);
    } catch {
      toast.error("Failed to create quiz");
    }
  };
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    const updated = quizzes.filter((q) => q.id !== id);
    saveToLocalStorage(updated);
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
