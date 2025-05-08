package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.PrivateChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface PrivateChatRepo extends JpaRepository<PrivateChat, Long> {
    Optional<PrivateChat> findByUser1IdAndUser2Id(Long user1Id, Long user2Id);
    List<PrivateChat> findAllByUser1IdOrUser2Id(Long user1Id, Long user2Id);

}
