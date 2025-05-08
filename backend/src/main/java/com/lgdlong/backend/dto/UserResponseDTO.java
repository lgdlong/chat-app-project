package com.lgdlong.backend.dto;


import com.fasterxml.jackson.annotation.*;
import com.lgdlong.backend.enums.*;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String username;
    private String phone;
    private String email;
    private String displayName;
    @JsonProperty("picUrl")
    private String avatarUrl;
    private UserRole role;
    private LocalDateTime createdAt;
    //private String status;
}