import { QuestionBlock } from "@/models/quiz";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

export default function QuizQuestionBlock({ block }: { block: QuestionBlock }) {
  const { content } = block;
  const isMultipleChoice = content.options && content.options.length > 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {content.question}
        </Typography>

        {isMultipleChoice ? (
          content.multiple ? (
            content.options?.map((opt, i) => (
              <FormControlLabel key={i} control={<Checkbox />} label={opt} />
            ))
          ) : (
            <RadioGroup defaultValue="">
              {content.options?.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio name={block.id} />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          )
        ) : (
          content.questionType === "text" && (
            <TextField
              fullWidth
              size="small"
              placeholder={content.placeholder || "Type your answer..."}
              sx={{ mt: 2 }}
            />
          )
        )}
      </CardContent>
    </Card>
  );
}
