package com.lgdlong.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String username;
    private String phone;
    private String email;
    private String password;
}
