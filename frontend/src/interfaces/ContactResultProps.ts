import { Contact } from "./Contact";

export interface ContactResultProps {
  contact: Contact | null;
  onSelect: (contact: number) => void;
  isSelected?: boolean;
}