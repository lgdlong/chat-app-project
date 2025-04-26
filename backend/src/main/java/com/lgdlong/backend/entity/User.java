package com.lgdlong.backend.entity;


import com.fasterxml.jackson.annotation.*;
import com.lgdlong.backend.enums.UserStatus;
import com.lgdlong.backend.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.crypto.password.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    public static final String DEFAULT_AVATAR_URL = "https://picsum.photos/id/237/200/300";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, nullable = false, unique = true)
    private String username;

    @Column(length = 10, nullable = false)
    private String phone;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    @Setter(AccessLevel.PUBLIC)
    @Getter(AccessLevel.PUBLIC)
    @JsonIgnore
    private String passwordHash;

    @Column(name = "display_name", length = 50)
    private String displayName;

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Constructor cho việc tạo người dùng mới
    public User(String username, String phone, String email, String password) {
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.passwordHash = password;
        this.displayName = "Default Display Name";
//        this.avatarUrl = avatarUrl != null ? avatarUrl : DEFAULT_AVATAR_URL;
        this.avatarUrl = DEFAULT_AVATAR_URL; // gắn avatar mặc định để test
        this.status = UserStatus.ACTIVE;
        this.role = UserRole.USER;
        this.createdAt = LocalDateTime.now();
    }

    public boolean checkPassword(String passwordHash, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(passwordHash, this.passwordHash);
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.avatarUrl == null) {
            this.avatarUrl = DEFAULT_AVATAR_URL;
        }
    }
}

