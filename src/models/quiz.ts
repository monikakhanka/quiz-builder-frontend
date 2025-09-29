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
