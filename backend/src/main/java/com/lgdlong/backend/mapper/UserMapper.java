package com.lgdlong.backend.mapper;

import com.lgdlong.backend.dto.UserResponseDTO;
import com.lgdlong.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDTO toDTO(User user) {
        return new UserResponseDTO(
            user.getId(),
            user.getUsername(),
            user.getPhone(),
            user.getEmail(),
            user.getDisplayName(),
            user.getAvatarUrl(),
            user.getRole()
        );
    }
}
