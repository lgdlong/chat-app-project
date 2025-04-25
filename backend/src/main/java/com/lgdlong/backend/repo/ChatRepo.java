package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.Chat;
import org.springframework.data.jpa.repository.*;

public interface ChatRepo extends JpaRepository<Chat, Long> {
}
