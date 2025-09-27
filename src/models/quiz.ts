export type BlockType = "heading" | "question" | "button" | "footer";

export type BlockContent =
  | { text: string }
  | { label: string }
  | {
      question: string;
      options?: string[];
      multiple?: boolean;
    };

export interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

export interface Quiz {
  id: string;
  title: string;
  blocks: Block[];
  published: boolean;
  updatedAt: string;
}
