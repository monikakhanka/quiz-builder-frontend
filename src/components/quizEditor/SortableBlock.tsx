import { Paper, Typography, IconButton, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@/models/quiz";

export default function SortableBlock({
  block,
  selected,
  onSelect,
  onDelete,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        border: selected ? "2px solid" : "1px solid #ccc",
        borderColor: selected ? "primary.main" : "divider",
        p: 2,
        mb: 2,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Delete fontSize="small" />
      </IconButton>

      {block.type === "heading" && <Typography variant="h6">{block.content.text}</Typography>}
      {block.type === "question" && (
        <Typography variant="body1">{block.content.question}</Typography>
      )}
      {block.type === "button" && <Button variant="outlined">{block.content.label}</Button>}
      {block.type === "footer" && <Typography variant="caption">{block.content.text}</Typography>}
    </Paper>
  );
}
