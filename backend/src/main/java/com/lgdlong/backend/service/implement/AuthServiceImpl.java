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
    public String login(String usernameOrPhone, String password) {
        User user = userService.getUserByUsernameOrPhone(usernameOrPhone);

        if (!user.checkPassword(password, passwordEncoder)) {
            throw new IllegalArgumentException("Invalid password");
        }

        return jwtTokenProvider.generateToken(usernameOrPhone);
    }

    @Override
    public User register(UserDTO userDTO) {
        return userService.createUser(userDTO);
    }
}
