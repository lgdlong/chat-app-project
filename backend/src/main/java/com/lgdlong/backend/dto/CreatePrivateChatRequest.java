package com.lgdlong.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePrivateChatRequest {
    private Long targetUserId;
}
