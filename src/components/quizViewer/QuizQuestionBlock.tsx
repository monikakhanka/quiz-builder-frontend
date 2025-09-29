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
  const { questionType, options, multiple, placeholder } = block.content;
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {block.content.question}
        </Typography>

        {questionType === "multiple-choice" &&
          options?.map((opt, i) =>
            multiple ? (
              <FormControlLabel key={i} control={<Checkbox />} label={opt} />
            ) : (
              <FormControlLabel key={i} control={<Radio name={block.id} />} label={opt} />
            )
          )}
        {questionType === "text" && (
          <TextField
            fullWidth
            size="small"
            placeholder={placeholder || "Type your answer..."}
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
