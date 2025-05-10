package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.implement.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.lgdlong.backend.mapper.UserMapper;
import com.lgdlong.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import com.lgdlong.backend.service.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private UserService userSvc;
    @Autowired private UserMapper mapper;
    private final AuthServiceImpl authServiceImpl;

    public AuthController(AuthServiceImpl authServiceImpl) {
        this.authServiceImpl = authServiceImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authServiceImpl.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserDTO userDTO) {
        UserMapper userMapper = new UserMapper();
        User user = authServiceImpl.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.toDTO(user));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        UserResponseDTO userDto = authServiceImpl.getCurrentUser();
        return ResponseEntity.ok(userDto);
    }
}
