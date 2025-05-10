// UserProfileProps.ts sẽ được mapping từ User.ts ngay trong ProfilePage.tsx

export interface UserProfileProps {
  username: string;
  displayName: string;
  email: string;
  phone: string;
  picUrl?: string;
  status?: string; // từ "online" | "busy" | "offline" → string
  createdAt: string;
}
