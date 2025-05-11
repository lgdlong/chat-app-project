package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;

import java.util.*;

public interface UserService {

    User createUser(UserDTO userDTO);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, UserUpdateDTO userUpdateDTO);

    User adminUpdateUser(Long id, AdminUserUpdate dto);

    void deleteUser(Long id);

    User getUserByUsername(String username);

    User getUserByPhone(String phone);

    Optional<User> getUserByUsernameOrPhone(String usernameOrPhone);

    void encryptPasswordForUser(Long id);
}