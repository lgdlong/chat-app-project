package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByUsername(String username);
}
