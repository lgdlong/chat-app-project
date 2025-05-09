package com.lgdlong.backend.service;

import com.lgdlong.backend.entity.*;
import org.springframework.data.domain.*;

import java.util.*;

public interface MessageService {
    Message createMessage(Long privateChatId, Long senderId, String message);

    void deleteMessage(Long messageId, Long currentUserId);

    Page<Message> getMessages(Long privateChatId, Pageable pageable);

    Optional<Message> getLastMessageForPrivateChat(Long privateChatId);

//    void editMessage(Long messageId, String newContent);
//
//    void markMessageAsRead(Long messageId);
//
//    void markMessageAsUnread(Long messageId);
}
