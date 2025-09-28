import { Quiz } from "@/models/quiz";
import { Container, Typography } from "@mui/material";
import QuizBlockRenderer from "./QuizBlockRenderer";

export default function QuizContent({ quiz }: { quiz: Quiz }) {
  if (!quiz.published) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Not published yet.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        {quiz.title}
      </Typography>

      {quiz.blocks.map((block) => (
        <QuizBlockRenderer key={block.id} block={block} />
      ))}
    </Container>
  );
}
