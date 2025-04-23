package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.Message;
import org.springframework.data.jpa.repository.*;

public interface MessageRepo extends JpaRepository<Message, Long> {
}
