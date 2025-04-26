package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.implement.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthServiceImpl authServiceImpl;

    public AuthController(AuthServiceImpl authServiceImpl) {
        this.authServiceImpl = authServiceImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String token = authServiceImpl.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new LoginResponse(token));
    }

//    @PostMapping("/register")
//    public String register(@RequestBody RegisterRequest registerRequest) {
//        // Implement registration logic
//        return "Registration successful";
//    }
}
