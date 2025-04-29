// Định nghĩa interface cho tin nhắn
export interface Message {
    id: number;
    sender: string;
    content: string;
    createdAt: Date;
  }