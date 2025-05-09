// src/interfaces/MessageStatusDTO.ts

export type DeliveryStatus = "SENT" | "DELIVERED" | "SEEN";

export interface MessageStatusDTO {
  messageId: number;
  userId: number;
  status: DeliveryStatus;
  updatedAt: string; // ISO format
}
