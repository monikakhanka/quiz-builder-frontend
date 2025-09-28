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
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {block.content.question}
        </Typography>

        {block.content.options?.map((opt, i) =>
          block.content.multiple ? (
            <FormControlLabel key={i} control={<Checkbox />} label={opt} />
          ) : (
            <FormControlLabel key={i} control={<Radio />} label={opt} />
          )
        )}

        {!block.content.options?.length && (
          <TextField fullWidth size="small" placeholder="Type your answer..." sx={{ mt: 2 }} />
        )}
      </CardContent>
    </Card>
  );
}
