package com.lgdlong.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateDTO {
    private String username;
    private String displayName;
    private String phone;
    private String email;
}
