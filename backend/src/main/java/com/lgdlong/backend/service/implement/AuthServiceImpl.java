package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.User;
import com.lgdlong.backend.mapper.*;
import com.lgdlong.backend.security.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.*;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    public LoginResponse login(String usernameOrPhone, String password) {
        try {
            User user = userService.getUserByUsernameOrPhone(usernameOrPhone)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrPhone));

            if (!user.checkPassword(password, passwordEncoder)) {
                throw new IllegalArgumentException("Invalid password");
            }

            long iat = System.currentTimeMillis() / 1000;
            long exp = iat + 3600;

            UserTokenInfo userTokenInfo = new UserTokenInfo(
                    user.getId(),
                    user.getUsername(),
                    user.getPhone(),
                    user.getEmail(),
                    user.getRole(),
                    iat,
                    exp
            );

            String token = jwtTokenProvider.generateToken(userTokenInfo);

            return new LoginResponse(token, user.getUsername(), user.getRole(), exp - iat);
        }catch (UsernameNotFoundException | IllegalArgumentException e) {
            // Có thể log chi tiết lỗi ở đây nếu muốn
            throw new RuntimeException("Login failed: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error during login", e);
        }
    }

    @Override
    public User register(UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @Override
    public UserResponseDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("🔍 Auth object: " + authentication);
        System.out.println("🔍 Auth class: " + authentication.getClass().getName());

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            Jwt jwt = jwtAuth.getToken();
            Long userId = Long.valueOf(jwt.getSubject());

            User user = userService.getUserById(userId);

            return userMapper.toDTO(user);
        } else {
            throw new RuntimeException("Unauthorized");
        }
    }
}
