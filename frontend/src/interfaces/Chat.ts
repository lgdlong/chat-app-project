export interface Chat {
  chatId: number;
  chatName: string;
  chatAvt: string,
  chatType: string; // PRIVATE (1-1) (chat with other user) | GROUP (1-MANY)
  createdBy: number;
  createdAt: Date;
}
