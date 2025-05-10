package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.UserDTO;
import com.lgdlong.backend.dto.UserUpdateDTO;
import com.lgdlong.backend.entity.User;

import java.util.*;

public interface UserService {

    User createUser(UserDTO userDTO);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, UserUpdateDTO userUpdateDTO);

    void deleteUser(Long id);

    User getUserByUsername(String username);

    User getUserByPhone(String phone);

    Optional<User> getUserByUsernameOrPhone(String usernameOrPhone);

    void encryptPasswordForUser(Long id);

}