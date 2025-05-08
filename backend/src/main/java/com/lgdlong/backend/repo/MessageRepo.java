package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.Message;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface MessageRepo extends JpaRepository<Message, Long> {
    List<Message> getMessagesByPrivateChatId(Long privateChatId);

    Optional<Message> findTopByPrivateChatIdOrderByCreatedAtDesc(Long privateChatId);
}
