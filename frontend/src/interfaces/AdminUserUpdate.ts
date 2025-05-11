import { UserStatus } from "../enums/UserEnums";

export interface AdminUserUpdate {
  username: string;
  displayName: string;
  email?: string; // ← CANT CHANGE
  phone?: string; // ← CANT CHANGE
  picUrl?: string; // ← made optional
  status?: UserStatus; // ← made optional
}
