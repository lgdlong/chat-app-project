package com.lgdlong.backend.repo;

import com.lgdlong.backend.entity.Message;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface MessageRepo extends JpaRepository<Message, Long> {
    List<Message> findAllByChatId(Long chatId);
}
