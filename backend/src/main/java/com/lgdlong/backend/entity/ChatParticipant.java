package com.lgdlong.backend.entity;

import com.lgdlong.backend.id.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
@Table(name = "chat_participants")
@Data // Lombok: tự động tạo getter, setter, toString, equals, hashCode
@Builder
@IdClass(ChatParticipantId.class)
@NoArgsConstructor
@AllArgsConstructor // Dùng composite key (chat_id, user_id)
public class ChatParticipant {
    @Id
    @Column(name = "chat_id", nullable = false)
    private Long chatId;

    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt = LocalDateTime.now();

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    public ChatParticipant(Long chatId, Long userId, Boolean isAdmin) {
        this.chatId = chatId;
        this.userId = userId;
        this.joinedAt = LocalDateTime.now();
        this.isAdmin = isAdmin;
    }

    @PrePersist
    protected void onCreate() {
        if (this.joinedAt == null) {
            this.joinedAt = LocalDateTime.now();
        }
    }
}
