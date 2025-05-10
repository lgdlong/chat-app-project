export interface ChatListItemDTO {
  chatId: number;
  targetUserId: number;
  displayName: string;
  avatarUrl: string;
  lastMessageAt: string | null; // ISO date string or null if no message yet
}