package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface MessageStatusRepo extends JpaRepository<MessageStatus, Long> {
    Optional<MessageStatus> findByMessageIdAndUserId(Long messageId, Long userId);
}
