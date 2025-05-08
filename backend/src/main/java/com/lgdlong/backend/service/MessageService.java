package com.lgdlong.backend.service;

import com.lgdlong.backend.entity.*;

import java.util.*;

public interface MessageService {
    Message createMessage(Long chatId, Long senderId, String message);

    void deleteMessage(Long messageId);

    List<Message> getMessages(Long chatId);

    Optional<Message> getLastMessageForPrivateChat(Long privateChatId);

//    void editMessage(Long messageId, String newContent);
//
//    void markMessageAsRead(Long messageId);
//
//    void markMessageAsUnread(Long messageId);
}
