package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.entity.User;
import com.lgdlong.backend.exception.*;
import com.lgdlong.backend.repo.*;
import com.lgdlong.backend.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(UserDTO userDTO) {
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        User user = new User(
                userDTO.getUsername(),
                userDTO.getPhone(),
                userDTO.getEmail(),
                encodedPassword
        );
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public User updateUser(Long id, UserDTO userDTO) {
        User existingUser = getUserById(id); // throws exception nếu không tìm thấy
        existingUser.setUsername(userDTO.getUsername());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPhone(userDTO.getPhone());
        return userRepo.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        User existingUser = getUserById(id); // throws exception nếu không tìm thấy
        userRepo.delete(existingUser);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
    }

    @Override
    public User getUserByPhone(String phone) {
        return userRepo.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException("User with phone " + phone + " not found"));
    }

    @Override
    public User getUserByUsernameOrPhone(String usernameOrPhone) {
        if (usernameOrPhone.matches("\\d{10,11}")) { // regex check phone
            return userRepo.findByPhone(usernameOrPhone)
                    .orElseThrow(() -> new UsernameNotFoundException("Phone not found"));
        } else {
            return userRepo.findByUsername(usernameOrPhone)
                    .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        }
    }

    public void encryptPasswordForUser(Long id) {
        // 1. Tìm user theo username
        User user = userRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 2. Kiểm tra xem passwordHash có cần encrypt không
        String currentPasswordHash = user.getPasswordHash();

        // Nếu password chưa được mã hóa (ví dụ độ dài ngắn hoặc không bắt đầu bằng $2a$)
        if (currentPasswordHash == null || !currentPasswordHash.startsWith("$2a$")) {
            // 3. Encrypt password
            String encodedPassword = passwordEncoder.encode(currentPasswordHash);

            // 4. Gán password mới
            user.setPasswordHash(encodedPassword);

            // 5. Save lại database
            userRepo.save(user);
        }
    }
}
