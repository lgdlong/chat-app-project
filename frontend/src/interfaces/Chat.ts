export interface Chat {
  chatId: number;
  chatAvt: string,
  chatType: string; // PRIVATE (1-1) (chat with other user) | GROUP (1-MANY)
  chatName: string;
  createdBy: number;
  createdAt: Date;
}
