export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  displayName?: string; // tùy có hay không (nếu lấy thêm từ /me)
  picUrl?: string; // = avatarUrl
  role?: string; // nếu muốn từ JWT
  status?: "online" | "busy" | "offline" | string; // frontend dùng status khác với UserStatus (backend)
  accountStatus?: string; // mapping từ backend's UserStatus (e.g., ACTIVE, BANNED)
  createdAt: string; // ISO string (backend gửi epoch thì convert)
}

export const defaultUser: User = {
  id: -1,
  displayName: "Guest",
  username: "guest",
  email: "guest@example.com",
  phone: "",
  picUrl: "https://picsum.photos/id/237/200/300",
  status: "online",
  createdAt: "2024-01-01T00:00:00Z",
};
