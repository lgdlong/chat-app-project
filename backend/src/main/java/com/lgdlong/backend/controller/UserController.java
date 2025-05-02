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

@CrossOrigin(origins = "*")
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

    // CREATE: POST /api/users
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.toDTO(createdUser));
    }

    // READ ALL: GET /api/users
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    // READ ONE BY ID: GET /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    // READ ONE BY PHONE: GET /api/users/by-phone?phone=...
    @GetMapping("/by-phone")
    public ResponseEntity<UserResponseDTO> getUserByPhone(@RequestParam("phone") String phone) {
        User user = userService.getUserByPhone(phone);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    // UPDATE: PUT /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id,
                                                      @RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(userMapper.toDTO(updatedUser));
    }

    // DELETE: DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // READ ONE BY USERNAME: GET /api/users/by-username?username=...
    @PostMapping("/hash-by-username/{id}")
    public ResponseEntity<Void> encryptPassword(@PathVariable Long id) {
        userService.encryptPasswordForUser(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<UserResponseDTO> searchUser(@RequestParam("query") String query) {
        Optional<User> userOpt = userService.getUserByUsernameOrPhone(query);

        return userOpt
                .map(user -> ResponseEntity.ok(userMapper.toDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }
}
