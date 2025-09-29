import { z } from "zod";

export interface HeadingBlock {
  id: string;
  type: "heading";
  content: { text: string };
}

export type QuestionType = "multiple-choice" | "text";
export interface QuestionBlock {
  id: string;
  type: "question";
  content: {
    questionType?: QuestionType;
    question: string;
    options?: string[];
    placeholder?: string;
    answer?: string | string[];
    multiple?: boolean;
  };
}

export interface ButtonBlock {
  id: string;
  type: "button";
  content: { label: string };
}

export interface FooterBlock {
  id: string;
  type: "footer";
  content: { text: string };
}

export type Block = HeadingBlock | QuestionBlock | ButtonBlock | FooterBlock;

export interface Quiz {
  id: string;
  title: string;
  blocks: Block[];
  published: boolean;
  updatedAt: string;
}

export const HeadingBlockSchema = z.object({
  id: z.string(),
  type: z.literal("heading"),
  content: z.object({
    text: z.string(),
  }),
});

export const QuestionBlockSchema = z.object({
  id: z.string(),
  type: z.literal("question"),
  content: z.object({
    questionType: z.enum(["multiple-choice", "text"]).optional(),
    question: z.string(),
    options: z.array(z.string()).optional(),
    placeholder: z.string().optional(),
    answer: z.union([z.string(), z.array(z.string())]).optional(),
    multiple: z.boolean().optional(),
  }),
});

export const ButtonBlockSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  content: z.object({
    label: z.string(),
  }),
});

export const FooterBlockSchema = z.object({
  id: z.string(),
  type: z.literal("footer"),
  content: z.object({
    text: z.string(),
  }),
});

// Union schema for all blocks
export const BlockSchema = z.union([
  HeadingBlockSchema,
  QuestionBlockSchema,
  ButtonBlockSchema,
  FooterBlockSchema,
]);

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  blocks: z.array(BlockSchema),
  published: z.boolean(),
  updatedAt: z.string(),
});

export const QuizzesSchema = z.array(QuizSchema);

// Infer type from schema (alternative to manual interfaces, optional)
export type QuizFromSchema = z.infer<typeof QuizSchema>;
