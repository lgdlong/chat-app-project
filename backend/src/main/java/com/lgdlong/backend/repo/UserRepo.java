package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByUsername(String username);
}
