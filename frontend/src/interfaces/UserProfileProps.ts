// UserProfileProps.ts sẽ được mapping từ User.ts ngay trong ProfilePage.tsx

export interface UserProfileProps {
  username: string;
  email: string;
  displayName: string;
  picUrl?: string;
  status?: string; // từ "online" | "busy" | "offline" → string
  phone: string;
  createdAt: string;
}
