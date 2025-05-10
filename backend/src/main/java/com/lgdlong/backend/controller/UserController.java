package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.mapper.*;
import com.lgdlong.backend.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    /**
     * Tạo người dùng mới.
     * Endpoint: POST /api/users
     */
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.toDTO(createdUser));
    }

    /**
     * Lấy tất cả người dùng.
     * Endpoint: GET /api/users
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    /**
     * Lấy người dùng theo ID.
     * Endpoint: GET /api/users/{id}
     * Ví dụ: /api/users/5
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    /**
     * Lấy người dùng theo số điện thoại.
     * Endpoint: GET /api/users/by-phone?phone=...
     * Ví dụ: /api/users/by-phone?phone=0987654321
     */
    @GetMapping("/by-phone")
    public ResponseEntity<UserResponseDTO> getUserByPhone(@RequestParam("phone") String phone) {
        User user = userService.getUserByPhone(phone);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    /**
     * Cập nhật người dùng theo ID.
     * Endpoint: PUT /api/users/{id}
     * Ví dụ: /api/users/5
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id,
                                                      @RequestBody UserUpdateDTO userDTO) {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(userMapper.toDTO(updatedUser));
    }

    /**
     * Xoá người dùng theo ID.
     * Endpoint: DELETE /api/users/{id}
     * Ví dụ: /api/users/5
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    /**
     * Mã hoá mật khẩu người dùng theo ID.
     * Endpoint: POST /api/users/hash-by-username/{id}
     * Ví dụ: /api/users/hash-by-username/5
     */
    @PostMapping("/hash-by-username/{id}")
    public ResponseEntity<Void> encryptPassword(@PathVariable Long id) {
        userService.encryptPasswordForUser(id);

        return ResponseEntity.ok().build();
    }

    /**
     * Tìm người dùng theo username hoặc số điện thoại.
     * Endpoint: GET /api/users/search?query=...
     * Ví dụ: /api/users/search?query=long123 hoặc /api/users/search?query=0987654321
     */
    @GetMapping("/search")
    public ResponseEntity<UserResponseDTO> searchUser(@RequestParam("query") String query) {
        Optional<User> userOpt = userService.getUserByUsernameOrPhone(query);

        return userOpt
                .map(user -> ResponseEntity.ok(userMapper.toDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }
}
