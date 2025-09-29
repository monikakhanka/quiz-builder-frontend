import {
  Paper,
  Typography,
  Divider,
  TextField,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Quiz, Block, HeadingBlock, QuestionBlock, ButtonBlock, FooterBlock } from "@/models/quiz";

type PropertiesPanelProps = {
  quiz: Quiz;
  selectedBlockId: string | null;
  onQuizChange: (q: Quiz) => void;
};

export default function PropertiesPanel({
  quiz,
  selectedBlockId,
  onQuizChange,
}: PropertiesPanelProps) {
  const selectedBlock = quiz.blocks.find((b) => b.id === selectedBlockId) || null;

  const handleBlockUpdate = (blockId: string, newBlock: Block) => {
    onQuizChange({
      ...quiz,
      blocks: quiz.blocks.map((b) => (b.id === blockId ? newBlock : b)),
    });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 340,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Properties
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {!selectedBlock && <Typography color="text.secondary">Select a block</Typography>}

      {selectedBlock?.type === "heading" && (
        <TextField
          fullWidth
          label="Heading Text"
          value={selectedBlock.content.text}
          onChange={(e) =>
            handleBlockUpdate(selectedBlock.id, {
              ...selectedBlock,
              content: { text: e.target.value },
            } as HeadingBlock)
          }
        />
      )}

      {selectedBlock?.type === "question" && (
        <Box>
          <TextField
            fullWidth
            label="Question Text"
            value={selectedBlock.content.question}
            onChange={(e) =>
              handleBlockUpdate(selectedBlock.id, {
                ...selectedBlock,
                content: { ...selectedBlock.content, question: e.target.value },
              } as QuestionBlock)
            }
            sx={{ mb: 2 }}
          />
          {selectedBlock.content.options?.map((opt, i) => (
            <TextField
              key={i}
              fullWidth
              label={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...(selectedBlock.content.options || [])];
                newOptions[i] = e.target.value;
                handleBlockUpdate(selectedBlock.id, {
                  ...selectedBlock,
                  content: { ...selectedBlock.content, options: newOptions },
                } as QuestionBlock);
              }}
              sx={{ mb: 1 }}
            />
          ))}
          <Button
            size="small"
            onClick={() =>
              handleBlockUpdate(selectedBlock.id, {
                ...selectedBlock,
                content: {
                  ...selectedBlock.content,
                  options: [...(selectedBlock.content.options || []), "New Option"],
                },
              } as QuestionBlock)
            }
          >
            + Add Option
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBlock.content.multiple || false}
                onChange={(e) =>
                  handleBlockUpdate(selectedBlock.id, {
                    ...selectedBlock,
                    content: {
                      ...selectedBlock.content,
                      multiple: e.target.checked,
                    },
                  } as QuestionBlock)
                }
              />
            }
            label="Allow multiple answers"
          />
        </Box>
      )}

      {selectedBlock?.type === "button" && (
        <TextField
          fullWidth
          label="Button Label"
          value={selectedBlock.content.label}
          onChange={(e) =>
            handleBlockUpdate(selectedBlock.id, {
              ...selectedBlock,
              content: { label: e.target.value },
            } as ButtonBlock)
          }
        />
      )}

      {selectedBlock?.type === "footer" && (
        <TextField
          fullWidth
          label="Footer Text"
          value={selectedBlock.content.text}
          onChange={(e) =>
            handleBlockUpdate(selectedBlock.id, {
              ...selectedBlock,
              content: { text: e.target.value },
            } as FooterBlock)
          }
        />
      )}
    </Paper>
  );
}
