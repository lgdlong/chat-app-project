export interface UserUpdateDTO {
    username: string;
    displayName: string;
    email: string;
    phone: string;
    picUrl?: string;             // ← made optional
    role?: "USER" | "ADMIN";    // ← made optional
  }