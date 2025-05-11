package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.exception.*;
import com.lgdlong.backend.repo.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

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

//    @Override
//    public User updateUser(Long id, UserUpdateDTO userDTO) {
//        User existingUser = getUserById(id); // throws exception nếu không tìm thấy
//
//        // Kiểm tra trùng email (nếu đổi)
//        Optional<User> userByEmail = userRepo.findByEmail(userDTO.getEmail());
//        if (userByEmail.isPresent() && !userByEmail.get().getId().equals(id)) {
//            throw new IllegalArgumentException("Email is already in use by another user.");
//        }
//
//        // Kiểm tra trùng phone (nếu đổi)
//        Optional<User> userByPhone = userRepo.findByPhone(userDTO.getPhone());
//        if (userByPhone.isPresent() && !userByPhone.get().getId().equals(id)) {
//            throw new IllegalArgumentException("Phone is already in use by another user.");
//        }
//
//        existingUser.setUsername(userDTO.getUsername());
//        existingUser.setDisplayName(userDTO.getDisplayName());
//        existingUser.setEmail(userDTO.getEmail());
//        existingUser.setPhone(userDTO.getPhone());
//
//        // nếu dto có thêm picUrl hoặc status thì set ở đây
//        return userRepo.save(existingUser);
//    }

    @Override
    public User updateUser(Long id, UserUpdateDTO dto) {
        User user = getUserById(id);

        checkDuplicateEmailAndPhone(dto.getEmail(), dto.getPhone(), id);
        applyBasicUserUpdates(user, dto.getUsername(), dto.getDisplayName(), dto.getEmail(), dto.getPhone());

        return userRepo.save(user);
    }


//    @Override
//    public User adminUpdateUser(Long id, AdminUserUpdate dto) {
//        User existingUserr = getUserById(id);
//
//        // Check email trùng
//        Optional<User> userByEmail = userRepo.findByEmail(dto.getEmail());
//        if (userByEmail.isPresent() && !userByEmail.get().getId().equals(id)) {
//            throw new IllegalArgumentException("Email is already in use by another user.");
//        }
//
//        // Check phone trùng
//        Optional<User> userByPhone = userRepo.findByPhone(dto.getPhone());
//        if (userByPhone.isPresent() && !userByPhone.get().getId().equals(id)) {
//            throw new IllegalArgumentException("Phone is already in use by another user.");
//        }
//
//        existingUserr.setUsername(dto.getUsername());
//        existingUserr.setDisplayName(dto.getDisplayName());
//        existingUserr.setEmail(dto.getEmail());
//        existingUserr.setPhone(dto.getPhone());
//
//        if (dto.getStatus() != null) {
//            existingUserr.setStatus(dto.getStatus());
//        }
//
//        if (dto.getPicUrl() != null) {
//            existingUserr.setAvatarUrl(dto.getPicUrl());
//        }
//
//        return userRepo.save(existingUserr);
//    }

    @Override
    public User adminUpdateUser(Long id, AdminUserUpdate dto) {
        User user = getUserById(id);

        checkDuplicateEmailAndPhone(dto.getEmail(), dto.getPhone(), id);
        applyBasicUserUpdates(user, dto.getUsername(), dto.getDisplayName(), dto.getEmail(), dto.getPhone());

        if (dto.getStatus() != null) {
            user.setStatus(dto.getStatus());
        }

        if (dto.getPicUrl() != null) {
            user.setAvatarUrl(dto.getPicUrl());
        }

        return userRepo.save(user);
    }


    @Override
    public void deleteUser(Long id) {
        User existingUser = getUserById(id); // throws exception nếu không tìm thấy
        userRepo.delete(existingUser);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsernameIgnoreCase(username) // 👈 use the new method
                .orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
    }


    @Override
    public User getUserByPhone(String phone) {
        return userRepo.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException("User with phone " + phone + " not found"));
    }

    @Override
    public Optional<User> getUserByUsernameOrPhone(String usernameOrPhone) {
        if (usernameOrPhone.matches("\\d{10,11}")) {
            return userRepo.findByPhone(usernameOrPhone);
        } else {
            return userRepo.findByUsernameIgnoreCase(usernameOrPhone); // 👈 here too
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

    private void checkDuplicateEmailAndPhone(String email, String phone, Long currentId) {
        userRepo.findByEmail(email).ifPresent(user -> {
            if (!user.getId().equals(currentId)) {
                throw new IllegalArgumentException("Email is already in use.");
            }
        });

        userRepo.findByPhone(phone).ifPresent(user -> {
            if (!user.getId().equals(currentId)) {
                throw new IllegalArgumentException("Phone is already in use.");
            }
        });
    }

    private void applyBasicUserUpdates(User user, String username, String displayName, String email, String phone) {
        user.setUsername(username);
        user.setDisplayName(displayName);
        user.setEmail(email);
        user.setPhone(phone);
    }

}
