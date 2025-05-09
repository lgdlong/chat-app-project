package com.lgdlong.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessagePayload {
    private Long privateChatId;
    private Long senderId;
    private String content;
}
