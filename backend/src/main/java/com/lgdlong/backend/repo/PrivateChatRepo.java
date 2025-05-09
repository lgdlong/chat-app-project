package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;

import java.util.*;

public interface PrivateChatRepo extends JpaRepository<PrivateChat, Long> {
    Optional<PrivateChat> findByUser1IdAndUser2Id(Long user1Id, Long user2Id);

    List<PrivateChat> findAllByUser1IdOrUser2Id(Long user1Id, Long user2Id);

    @Query("""
                SELECT COUNT(c) > 0
                FROM PrivateChat c
                WHERE c.id = :chatId
                  AND (:userId = c.user1Id OR :userId = c.user2Id)
            """)
    boolean isParticipant(@Param("chatId") Long chatId, @Param("userId") Long userId);
}
