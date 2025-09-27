import { useEffect, useState } from "react";
import { api } from "../api";
import { Quiz } from "../models/quiz";
import Link from "next/link";
import AppLayout from "../components/layouts/AppLayout";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    api.get("/quizzes").then((res) => setQuizzes(res.data));
  }, []);

  const handleCreate = async () => {
    const res = await api.post("/quizzes", { title: "New Quiz"});
    setQuizzes((prev) => [...prev, res.data]);
  };

  return (
    <AppLayout>
      <h1>Quizzes</h1>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        Create Quiz
      </Button>

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
              <TableCell>{new Date(quiz.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <Link href={`/edit/${quiz.id}`}>Edit</Link> |{" "}
                <Link href={`/quiz/${quiz.id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
}
