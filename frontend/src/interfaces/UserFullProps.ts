import { UserRole, UserStatus } from "../enums/UserEnums";

export interface UserFullProps {
  id: number;
  username: string;
  phone: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string; // LocalDateTime → string ISO
}

