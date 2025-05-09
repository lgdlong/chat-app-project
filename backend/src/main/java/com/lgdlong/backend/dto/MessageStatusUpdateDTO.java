package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.*;

@Data
public class MessageStatusUpdateDTO {
    private Long messageId;
    private Long userId;
    private DeliveryStatus status;
}
