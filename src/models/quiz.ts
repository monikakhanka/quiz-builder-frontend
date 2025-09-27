export type BlockType = "heading" | "question" | "button" | "footer";

export interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export interface Quiz {
  id: string;
  title: string;
  blocks: Block[];
  published: boolean;
  updatedAt: string;
}
