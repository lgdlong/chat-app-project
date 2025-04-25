package com.lgdlong.backend.entity;

import com.lgdlong.backend.id.*;
import jakarta.persistence.*;
import lombok.*;
import com.lgdlong.backend.enums.DeliveryStatus;
import java.time.*;

@Entity
@Table(name = "message_statuses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(MessageStatusId.class)
public class MessageStatus {
    @Id
    @Column(name = "message_id", nullable = false)
    private Long messageId;

    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status = DeliveryStatus.SENT; // Enum default = 'sent'

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}