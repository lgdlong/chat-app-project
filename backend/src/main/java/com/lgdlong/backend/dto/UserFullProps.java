package com.lgdlong.backend.dto;

import com.lgdlong.backend.enums.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
/**
 * Data Transfer Object for representing complete user information.
 * Used primarily for admin interfaces and detailed user views.
 */
public class UserFullProps {
    @NotNull(message = "User ID cannot be null")
    private Long id;

    @NotBlank(message = "Username cannot be blank")
    private String username;

    private String phone;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Display name cannot be blank")
    private String displayName;

    private String avatarUrl;

    @NotNull(message = "Status cannot be null")
    private UserStatus status;

    @NotNull(message = "Role cannot be null")
    private UserRole role;

    @NotNull(message = "Creation date cannot be null")
    private LocalDateTime createdAt;
}
