package com.lgdlong.backend.dto;


import com.lgdlong.backend.enums.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String username;
    private String phone;
    private String email;
    private String displayName;
    private String avatarUrl;
    private UserRole role;
}