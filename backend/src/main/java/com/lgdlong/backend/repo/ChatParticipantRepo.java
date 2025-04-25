package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.ChatParticipant;
import org.springframework.data.jpa.repository.*;

public interface ChatParticipantRepo extends JpaRepository<ChatParticipant, Long> {
}
