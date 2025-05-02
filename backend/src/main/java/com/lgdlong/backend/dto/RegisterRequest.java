package com.lgdlong.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String phone;
    private String email;
    private String password;
}
