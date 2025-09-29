import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Quiz, Block } from "@/models/quiz";

type BlocksSideBarProps = {
  quiz: Quiz;
  onQuizSave: (q: Quiz) => void;
};

export default function BlocksSidebar({ quiz, onQuizSave }: BlocksSideBarProps) {
  const addBlock = (type: Block["type"]) => {
    const newBlock: Block =
      type === "heading"
        ? { id: crypto.randomUUID(), type: "heading", content: { text: "New Heading" } }
        : type === "question"
          ? {
              id: crypto.randomUUID(),
              type: "question",
              content: {
                questionType: "text",
                question: "Question",
                placeholder: "Enter your answer...",
                answer: "",
              },
            }
          : type === "button"
            ? { id: crypto.randomUUID(), type: "button", content: { label: "Click Me" } }
            : { id: crypto.randomUUID(), type: "footer", content: { text: "Footer text" } };
    onQuizSave({ ...quiz, blocks: [...quiz.blocks, newBlock] });
  };

  return (
    <Paper
      elevation={1}
      sx={{ width: 220, p: 2, flexShrink: 0, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Blocks
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List>
        {["heading", "question", "button", "footer"].map((type) => (
          <ListItem disablePadding key={type}>
            <ListItemButton onClick={() => addBlock(type as Block["type"])}>
              <ListItemText primary={type.charAt(0).toUpperCase() + type.slice(1)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
