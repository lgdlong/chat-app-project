package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.MessageStatus;
import org.springframework.data.jpa.repository.*;

public interface MessageStatusRepo extends JpaRepository<MessageStatus, Long> {
}
