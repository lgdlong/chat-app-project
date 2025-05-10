export interface UserUpdateDTO {
    username: string;
    displayName: string;
    email: string;
    phone: string;
    picUrl: string;
    role: "USER" | "ADMIN";
  }