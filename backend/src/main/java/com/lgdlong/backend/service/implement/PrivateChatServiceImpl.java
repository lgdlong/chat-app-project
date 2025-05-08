package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.ChatListItemDTO;
import com.lgdlong.backend.entity.Message;
import com.lgdlong.backend.entity.PrivateChat;
import com.lgdlong.backend.entity.User;
import com.lgdlong.backend.mapper.ChatMapper;
import com.lgdlong.backend.repo.PrivateChatRepo;
import com.lgdlong.backend.service.MessageService;
import com.lgdlong.backend.service.PrivateChatService;
import com.lgdlong.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;
import java.util.stream.Collectors;

/**
 * Service implementation cho xử lý logic liên quan đến private chat (chat 1-1).
 * - Đảm bảo không tạo trùng đoạn chat giữa 2 người.
 * - Trả về danh sách các đoạn chat của người dùng hiện tại (chat list).
 */
@Service
@RequiredArgsConstructor
public class PrivateChatServiceImpl implements PrivateChatService {

    private final UserService userService;
    private final MessageService messageService;
    private final PrivateChatRepo privateChatRepo;
    private final ChatMapper chatMapper;

    /**
     * Tạo mới hoặc trả về đoạn chat 1-1 giữa hai người dùng.
     * Nếu đã tồn tại (user1-user2 hoặc user2-user1), sẽ không tạo mới.
     *
     * @param userId1 ID của người dùng thứ nhất
     * @param userId2 ID của người dùng thứ hai
     * @return Đoạn chat đã tồn tại hoặc mới được tạo
     */
    @Override
    @Transactional
    public PrivateChat createOrGetChat(Long userId1, Long userId2) {
        Long minId = Math.min(userId1, userId2);
        Long maxId = Math.max(userId1, userId2);

        Optional<PrivateChat> existing = privateChatRepo.findByUser1IdAndUser2Id(minId, maxId);
        if (existing.isPresent()) {
            return existing.get();
        }

        PrivateChat chat = PrivateChat.builder()
                .user1Id(minId)
                .user2Id(maxId)
                .build();

        return privateChatRepo.save(chat);
    }

    /**
     * Lấy toàn bộ danh sách các đoạn chat 1-1 của người dùng hiện tại.
     * Dùng để hiển thị chat list trong sidebar hoặc homepage.
     *
     * @param currentUserId ID người dùng hiện tại
     * @return Danh sách các đoạn chat đã có, dưới dạng DTO để hiển thị
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChatListItemDTO> getAllChatsForUser(Long currentUserId) {
        List<PrivateChat> chats = privateChatRepo.findAllByUser1IdOrUser2Id(currentUserId, currentUserId);

        return chats.stream().map(chat -> {
            Long targetId = chat.getUser1Id().equals(currentUserId) ? chat.getUser2Id() : chat.getUser1Id();
            User targetUser = userService.getUserById(targetId);
            Message lastMessage = messageService.getLastMessageForPrivateChat(chat.getId()).orElse(null);
            return chatMapper.toDTO(chat, targetUser, lastMessage);
        }).collect(Collectors.toList());
    }
}
