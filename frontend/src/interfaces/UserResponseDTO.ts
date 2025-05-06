export interface UserResponseDTO {
  id: number;
  username: string;
  phone: string;
  email: string;
  displayName: string;
  picUrl: string; // ánh xạ từ @JsonProperty("picUrl")
  role: UserRole;
}

export type UserRole = "USER" | "ADMIN"; // tuỳ enum bên backend
