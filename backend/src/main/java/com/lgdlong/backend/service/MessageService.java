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


    /**
     * Đánh dấu 1 tin nhắn là đã thu hồi (isRevoked=true, revokedAt=now).
     * @param messageId ID tin nhắn cần thu hồi
     * @param currentUserId ID người dùng đang thực hiện thu hồi
     * @return Message đã được cập nhật trường isRevoked, revokedAt
     */
    Message revokeMessage(Long messageId, Long currentUserId);
}
