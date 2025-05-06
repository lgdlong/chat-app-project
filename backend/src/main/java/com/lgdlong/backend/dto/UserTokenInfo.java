package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtTokenPayload {
    private Long id;  // user ID
    private String username;
    private String phone;
    private String email;
    private UserRole role;
    private long iat;  // issued at - epoch seconds
    private long exp;  // expiration time - epoch seconds
}
