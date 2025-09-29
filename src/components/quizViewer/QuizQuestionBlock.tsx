import { QuestionBlock } from "@/models/quiz";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";

export default function QuizQuestionBlock({ block }: { block: QuestionBlock }) {
  const { content } = block;
  console.log("block content:", block.content);
  const isMultipleChoice = content.options && content.options.length > 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {content.question}
        </Typography>

        {isMultipleChoice
          ? content.options!.map((opt, i) =>
              content.multiple ? (
                <FormControlLabel key={i} control={<Checkbox />} label={opt} />
              ) : (
                <FormControlLabel key={i} control={<Radio name={block.id} />} label={opt} />
              )
            )
          : content.questionType === "text" && (
              <TextField
                fullWidth
                size="small"
                placeholder={content.placeholder || "Type your answer..."}
                sx={{ mt: 2 }}
              />
            )}
      </CardContent>
    </Card>
  );
}
