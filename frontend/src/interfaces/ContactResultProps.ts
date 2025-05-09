import { UserResponseDTO } from "./UserResponseDTO";

export interface ContactResultProps {
  contact: UserResponseDTO | null;
  onSelect: (contact: UserResponseDTO) => void;
  isSelected?: boolean;
}