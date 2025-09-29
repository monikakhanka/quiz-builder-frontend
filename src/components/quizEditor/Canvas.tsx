import { Box } from "@mui/material";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableBlock from "./SortableBlock";
import { Block, Quiz } from "@/models/quiz";
import { useEffect, useState } from "react";

export default function Canvas({
  quiz,
  saveQuiz,
  selectedBlockId,
  setSelectedBlockId,
}: {
  quiz: Quiz;
  saveQuiz: (q: Quiz) => void;
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [blocks, setBlocks] = useState<Block[]>(quiz.blocks);

  useEffect(() => {
    setBlocks(quiz.blocks);
  }, [quiz.blocks]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = quiz.blocks.findIndex((b) => b.id === active.id);
    const newIndex = quiz.blocks.findIndex((b) => b.id === over.id);

    if (oldIndex !== newIndex) {
      saveQuiz({ ...quiz, blocks: arrayMove(quiz.blocks, oldIndex, newIndex) });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = quiz.blocks.findIndex((b) => b.id === active.id);
      const newIndex = quiz.blocks.findIndex((b) => b.id === over.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      setBlocks(newBlocks);
      saveQuiz({ ...quiz, blocks: newBlocks });
    }
  };

  const deleteBlock = (blockId: string) => {
    saveQuiz({ ...quiz, blocks: quiz.blocks.filter((b) => b.id !== blockId) });
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  return (
    <Box flex={1} p={2} sx={{ overflowY: "auto" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={quiz.blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {quiz.blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              selected={block.id === selectedBlockId}
              onSelect={() => setSelectedBlockId(block.id)}
              onDelete={() => deleteBlock(block.id)}
              onUpdate={() => {}}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
}
