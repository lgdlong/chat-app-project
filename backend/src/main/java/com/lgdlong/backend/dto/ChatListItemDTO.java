package com.lgdlong.backend.dto;

import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatListItemDTO {
    private Long chatId;
    private Long targetUserId;
    private String displayName;
    private String avatarUrl;
    private LocalDateTime lastMessageAt;
}
