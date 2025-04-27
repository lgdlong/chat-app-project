package com.lgdlong.backend.id;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageStatusId implements java.io.Serializable {
    private Long messageId;
    private Long userId;
}