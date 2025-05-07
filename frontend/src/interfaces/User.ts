export interface User {
  id: number;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  picUrl?: string;
  status?: string; // từ "online" | "busy" | "offline" → string
}

export const defaultUser: User = {
  id: -1,
  displayName: "Guest",
  username: "guest",
  email: "guest@example.com",
  phone: "",
  picUrl: "https://picsum.photos/id/237/200/300",
};
