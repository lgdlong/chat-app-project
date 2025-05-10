export interface UserUpdateDTO {
    username: string;
    displayName: string;
    email?: string;             // ← CANT CHANGE
    phone?: string;             // ← CANT CHANGE
    picUrl?: string;            // ← made optional
    role?: "USER" | "ADMIN";    // ← made optional
  }