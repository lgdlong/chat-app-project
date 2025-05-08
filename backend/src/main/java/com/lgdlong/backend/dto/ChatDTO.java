package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private String chatName;
    private ChatType chatType;
    private Long createdBy;
}
