package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.entity.Message;
import com.lgdlong.backend.exception.ResourceNotFoundException;
import com.lgdlong.backend.repo.MessageRepo;
import com.lgdlong.backend.repo.PrivateChatRepo;
import com.lgdlong.backend.repo.UserRepo;
import com.lgdlong.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * MessageServiceImpl xử lý toàn bộ logic liên quan đến việc gửi, lấy và xoá tin nhắn
 * trong các cuộc trò chuyện 1-1 (PrivateChat).
 */
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final UserRepo userRepo;
    private final MessageRepo messageRepo;
    private final PrivateChatRepo privateChatRepo;

    /**
     * Tạo một tin nhắn mới trong cuộc trò chuyện 1-1.
     *
     * @param privateChatId ID đoạn chat
     * @param senderId      ID người gửi
     * @param message       Nội dung tin nhắn
     * @return Message đã được lưu
     * @throws ResourceNotFoundException nếu privateChat hoặc user không tồn tại
     */
    @Override
    @Transactional
    public Message createMessage(Long privateChatId, Long senderId, String message) {
        // Kiểm tra private chat tồn tại
        if (!privateChatRepo.existsById(privateChatId)) {
            throw new ResourceNotFoundException("Private chat not found with id: " + privateChatId);
        }

        // Kiểm tra người gửi tồn tại
        if (!userRepo.existsById(senderId)) {
            throw new ResourceNotFoundException("User not found with id: " + senderId);
        }

        // Tạo và lưu tin nhắn mới
        Message mess = new Message(privateChatId, senderId, message);
        return messageRepo.save(mess);
    }

    /**
     * Xoá một tin nhắn theo ID.
     *
     * @param messageId ID tin nhắn
     */
    @Override
    public void deleteMessage(Long messageId) {
        messageRepo.deleteById(messageId);
    }

    /**
     * Trả về danh sách tin nhắn trong đoạn chat, sắp xếp theo thời gian giảm dần (mới nhất trước).
     *
     * @param privateChatId ID đoạn chat
     * @param pageable      Tham số phân trang
     * @return Page<Message>
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Message> getMessages(Long privateChatId, Pageable pageable) {
        return messageRepo.findByPrivateChatIdOrderByCreatedAtDesc(privateChatId, pageable);
    }

    /**
     * Lấy tin nhắn cuối cùng trong một đoạn chat (nếu có).
     *
     * @param privateChatId ID đoạn chat
     * @return Optional<Message>
     */
    @Override
    public Optional<Message> getLastMessageForPrivateChat(Long privateChatId) {
        return messageRepo.findTopByPrivateChatIdOrderByCreatedAtDesc(privateChatId);
    }
}
