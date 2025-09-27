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
        .get("/quizzes")
        .then((res) => setQuizzes(res.data))
        .catch(() => toast.error("Failed to load quizzes"));
    }
  }, [quizzes, setQuizzes]);

  const handleCreate = async () => {
    try {
      const res = await api.post("/quizzes", { title: "New Quiz" });
      setQuizzes((prev) => [...prev, res.data]);
      toast.success("Quiz created successfully");
      router.push(`/edit/${res.data.id}`);
    } catch {
      toast.error("Failed to create quiz");
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
                <Link href={`/quiz/${quiz.id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
