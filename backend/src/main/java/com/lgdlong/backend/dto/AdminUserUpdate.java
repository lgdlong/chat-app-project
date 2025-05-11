package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserUpdate {
    private String username;
    private String displayName;
    // Email cannot be changed by admin
    private String email;
    // Phone cannot be changed by admin
    private String phone;
    private String picUrl; // avatarUrl
    private UserStatus status;
}
