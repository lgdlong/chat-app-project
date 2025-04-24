package com.lgdlong.backend.dto;


import lombok.*;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
}
