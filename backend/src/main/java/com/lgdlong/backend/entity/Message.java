package com.lgdlong.backend.entity;

import com.lgdlong.backend.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 👉 Một trong hai phải có
    @Column(name = "private_chat_id")
    private Long privateChatId;

    @Column(name = "group_chat_id")
    private Long groupChatId;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageType type = MessageType.TEXT;

    @Column(name = "media_id")
    private Long mediaId;

    @Column(name = "reply_to_id")
    private Long replyToId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_revoked", nullable = false)
    private Boolean isRevoked = false;

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    public Message(Long privateChatId, Long senderId, String content) {
        this.privateChatId = privateChatId;
        this.senderId = senderId;
        this.content = content;
        this.type = MessageType.TEXT;
        this.createdAt = LocalDateTime.now();
        this.isRevoked = false;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
