package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTokenInfo {
    private Long id;             // user ID
    private String username;
    private String phone;
    private String email;
    private UserRole role;
    private UserStatus status;   // ✅ trạng thái tài khoản (ACTIVE, BANNED, etc.)
    private long iat;            // issued at - epoch seconds
    private long exp;            // expiration time - epoch seconds
    private long createdAt;      // ✅ thời điểm tạo tài khoản - epoch seconds
}
