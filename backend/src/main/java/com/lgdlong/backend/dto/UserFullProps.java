package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.*;

import java.time.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserFullProps {
    private Long id;
    private String username;
    private String phone;
    private String email;
    private String displayName;
    private String avatarUrl;
    private UserStatus status;
    private UserRole role;
    private LocalDateTime createdAt;
}
