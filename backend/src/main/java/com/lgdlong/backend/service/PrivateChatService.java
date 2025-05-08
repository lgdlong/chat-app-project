package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.PrivateChat;

import java.util.*;

public interface PrivateChatService {
    PrivateChat createOrGetChat(Long userId1, Long userId2);
    List<ChatListItemDTO> getAllChatsForUser(Long userId);

}
