import { Block } from "@/models/quiz";
import { Box, Button, Typography } from "@mui/material";
import QuizQuestionBlock from "./QuizQuestionBlock";

export default function QuizBlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <Typography variant="h5" sx={{ mt: 3, mb: 2, fontWeight: "bold" }}>
          {block.content.text}
        </Typography>
      );

    case "question":
      return <QuizQuestionBlock block={block} />;

    case "button":
      return (
        <Box textAlign="center" my={3}>
          <Button variant="contained" size="large">
            {block.content.label}
          </Button>
        </Box>
      );

    case "footer":
      return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          {block.content.text}
        </Typography>
      );

    default:
      return null;
  }
}
