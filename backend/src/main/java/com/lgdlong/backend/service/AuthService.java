package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;

public interface AuthService {
    String login(String username, String password);

    User register(UserDTO userDTO);

//    void logout(String token);
//
//    boolean isLoggedIn(String token);
}
