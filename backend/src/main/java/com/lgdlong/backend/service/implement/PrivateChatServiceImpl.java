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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service implementation để xử lý các chức năng liên quan đến private chat (chat 1-1).
 *
 * Chức năng chính:
 * - Tạo đoạn chat mới giữa 2 user nếu chưa tồn tại
 * - Trả về danh sách các đoạn chat của user hiện tại
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PrivateChatServiceImpl implements PrivateChatService {

    private final UserService userService;
    private final MessageService messageService;
    private final PrivateChatRepo privateChatRepo;
    private final ChatMapper chatMapper;

    /**
     * Tạo hoặc trả về đoạn chat 1-1 giữa hai người dùng.
     * Đảm bảo luôn sắp xếp user theo thứ tự user1Id < user2Id để tránh trùng cặp (A–B và B–A).
     *
     * @param userId1 ID của người dùng thứ nhất
     * @param userId2 ID của người dùng thứ hai
     * @return PrivateChat đã tồn tại hoặc mới tạo
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

        // Nếu chưa tồn tại thì tạo mới
        PrivateChat chat = PrivateChat.builder()
                .user1Id(minId)
                .user2Id(maxId)
                .build();

        return privateChatRepo.save(chat);
    }

    /**
     * Trả về tất cả đoạn chat 1-1 mà người dùng hiện tại tham gia.
     * Mỗi đoạn chat kèm theo thông tin người còn lại và tin nhắn cuối cùng.
     *
     * @param currentUserId ID người dùng hiện tại
     * @return Danh sách ChatListItemDTO để hiển thị trên UI
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChatListItemDTO> getAllChatsForUser(Long currentUserId) {
        List<PrivateChat> chats = privateChatRepo.findAllByUser1IdOrUser2Id(currentUserId, currentUserId);

        return chats.stream().map(chat -> {
            // Xác định người còn lại trong cuộc trò chuyện
            Long targetId = chat.getUser1Id().equals(currentUserId) ? chat.getUser2Id() : chat.getUser1Id();

            // Lấy thông tin người còn lại, fallback nếu có lỗi
            User targetUser;
            try {
                targetUser = userService.getUserById(targetId);
            } catch (Exception e) {
                log.error("❌ Không thể lấy user ID {}: {}", targetId, e.getMessage());
                targetUser = User.builder()
                        .username("Unknown User")
                        .displayName("Không rõ")
                        .build();
            }

            // Lấy tin nhắn cuối cùng nếu có
            Message lastMessage = null;
            try {
                lastMessage = messageService.getLastMessageForPrivateChat(chat.getId()).orElse(null);
            } catch (Exception e) {
                log.error("❌ Không thể lấy tin nhắn cuối của chat ID {}: {}", chat.getId(), e.getMessage());
            }

            // Mapping sang DTO
            return chatMapper.toDTO(chat, targetUser, lastMessage);
        }).collect(Collectors.toList());
    }
}