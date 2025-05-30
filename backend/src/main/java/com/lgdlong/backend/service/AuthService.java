package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;

public interface AuthService {
    LoginResponse login(String username, String password);

    User register(UserDTO userDTO);

    UserResponseDTO getCurrentUser();

//    void logout(String token);
//
//    boolean isLoggedIn(String token);
}
