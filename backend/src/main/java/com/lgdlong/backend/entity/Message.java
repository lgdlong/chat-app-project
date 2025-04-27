package com.lgdlong.backend.entity;

import com.lgdlong.backend.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(name = "chat_id", nullable = false)
    private Long chatId;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageType type = MessageType.TEXT; // Enum default = 'text'

    @Column(name = "media_id")
    private Long mediaId;

    @Column(name = "reply_to_id")
    private Long replyToId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_revoked", nullable = false)
    private Boolean isRevoked = false; // Tin nhắn bị thu hồi

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;
}
