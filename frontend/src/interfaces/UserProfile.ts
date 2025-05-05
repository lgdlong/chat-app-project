export interface UserProfile {
    id: number;
    username: string;
    email: string;
    displayName: string;
    picUrl?: string;
    status: string; // từ "online" | "busy" | "offline" → string
    // bio?: string;
    // createdAt: string;
  }
  