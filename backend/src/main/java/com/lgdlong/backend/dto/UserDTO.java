package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
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
