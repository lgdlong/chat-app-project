package com.lgdlong.backend.mapper;

import com.lgdlong.backend.dto.ChatListItemDTO;
import com.lgdlong.backend.entity.Message;
import com.lgdlong.backend.entity.PrivateChat;
import com.lgdlong.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {

    public ChatListItemDTO toDTO(PrivateChat chat, User targetUser, Message lastMessage) {
        return new ChatListItemDTO(
                chat.getId(),
                targetUser.getId(),
                targetUser.getDisplayName(),
                targetUser.getAvatarUrl(),
                lastMessage != null ? lastMessage.getCreatedAt() : null
        );
    }
}
