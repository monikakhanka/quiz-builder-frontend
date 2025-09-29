import React, { useState, useEffect } from "react";
import { Paper, TextField, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@/models/quiz";

interface SortableBlockProps {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdate: (updatedBlock: Partial<Block>) => void;
}

export default function SortableBlock({
  block,
  selected,
  onSelect,
  onDelete,
  onUpdate,
}: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  const [value, setValue] = useState(
    block.type === "heading"
      ? block.content.text || ""
      : block.type === "question"
        ? block.content.question || ""
        : block.type === "button"
          ? block.content.label || ""
          : block.content.text || ""
  );

  useEffect(() => {
    if (block.type === "heading") setValue(block.content.text || "");
    else if (block.type === "question") setValue(block.content.question || "");
    else if (block.type === "button") setValue(block.content.label || "");
    else setValue(block.content.text || "");
  }, [block]);

  const handleBlur = () => {
    if (block.type === "heading") onUpdate({ content: { ...block.content, text: value } });
    else if (block.type === "question")
      onUpdate({ content: { ...block.content, question: value } });
    else if (block.type === "button") onUpdate({ content: { ...block.content, label: value } });
    else onUpdate({ content: { ...block.content, text: value } });
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16 }}>
      <Paper
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        {...attributes}
        {...listeners}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).tagName !== "INPUT") onSelect();
        }}
        sx={{
          border: selected ? "2px solid" : "1px solid transparent",
          borderColor: selected ? "primary.main" : "transparent",
          p: 2,
          flex: 1,
          cursor: "pointer",
          position: "relative",
        }}
      >
        {block.type === "heading" && (
          <TextField
            variant="standard"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            sx={{
              "& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before":
                { borderBottom: "none" },
              padding: 0,
            }}
          />
        )}

        {block.type === "question" && (
          <TextField
            variant="standard"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            sx={{
              "& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before":
                { borderBottom: "none" },
              padding: 0,
            }}
          />
        )}

        {block.type === "button" && (
          <TextField
            variant="standard"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            sx={{
              "& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before":
                { borderBottom: "none" },
              padding: 0,
            }}
          />
        )}

        {block.type === "footer" && (
          <TextField
            variant="standard"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            sx={{
              "& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before":
                { borderBottom: "none" },
              padding: 0,
            }}
          />
        )}
      </Paper>

      <IconButton onClick={onDelete} sx={{ mt: 1 }}>
        <Delete />
      </IconButton>
    </div>
  );
}
