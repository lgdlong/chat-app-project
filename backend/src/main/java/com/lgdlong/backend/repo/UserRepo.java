package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.*;
import org.springframework.data.jpa.repository.*;

public interface UserRepo extends JpaRepository<User, Long> {
}
