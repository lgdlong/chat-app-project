package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.User;
import com.lgdlong.backend.security.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public LoginResponse login(String usernameOrPhone, String password) {
        User user = userService.getUserByUsernameOrPhone(usernameOrPhone);

        if (!user.checkPassword(password, passwordEncoder)) {
            throw new IllegalArgumentException("Invalid password");
        }

        long iat = System.currentTimeMillis() / 1000;
        long exp = iat + 3600; // 1 giờ

        JwtTokenPayload payload = new JwtTokenPayload(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getRole(),
                iat,
                exp
        );

        String token = jwtTokenProvider.generateToken(payload);

        return new LoginResponse(token, user.getUsername(), user.getRole(), exp - iat);
    }


    @Override
    public User register(UserDTO userDTO) {
        return userService.createUser(userDTO);
    }
}
