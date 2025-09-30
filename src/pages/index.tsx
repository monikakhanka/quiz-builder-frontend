import { useEffect, useState } from "react";
import { api } from "../api";
import { Quiz, QuizzesSchema } from "../models/quiz";
import Link from "next/link";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LocalDate from "@/components/ui/LocalDate";
import PageLayout from "@/components/layouts/PageLayout";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/quizzes")
      .then((res) => {
        const parsed = QuizzesSchema.parse(res.data);
        setQuizzes(parsed);
      })
      .catch(() => toast.error("Failed to load quizzes"));
  }, []);

  const handleQuizCreate = async () => {
    try {
      const res = await api.post<Quiz>("/quizzes", {
        title: "New Quiz",
        blocks: [],
        published: false,
      });
      setQuizzes((prev) => [...prev, res.data]);
      toast.success("Quiz created successfully");
      router.push(`/edit/${res.data.id}`);
    } catch {
      toast.error("Failed to create quiz");
    }
  };
  const handleQuizDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      toast.success("Quiz deleted successfully");
    } catch {
      toast.error("Failed to delete quiz");
    }
  };
  return (
    <PageLayout
      title="Quizzes"
      actions={
        <Button variant="contained" onClick={handleQuizCreate}>
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
          {quizzes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ borderBottom: "none" }}>
                No data to display
              </TableCell>
            </TableRow>
          ) : (
            quizzes.map((quiz) => (
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
                    onClick={() => handleQuizDelete(quiz.id)}
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
            ))
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
