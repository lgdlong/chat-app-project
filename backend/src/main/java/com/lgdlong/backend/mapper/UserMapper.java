package com.lgdlong.backend.mapper;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import org.springframework.stereotype.*;

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
                user.getRole(),
                user.getCreatedAt()
        );
    }

    public UserFullProps toFullProps(User user) {
        return new UserFullProps(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getStatus(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
