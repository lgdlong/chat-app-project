package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private UserRole role;
    private long expiresIn; // tính bằng giây (seconds)
}
