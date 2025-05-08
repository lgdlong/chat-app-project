package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.repo.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepo messageRepo;

    @Override
    public Message createMessage(Long privateChatId, Long senderId, String message) {
        Message mess = new Message(
                privateChatId,
                senderId,
                message
        );
        return messageRepo.save(mess);
    }

    @Override
    public void deleteMessage(Long messageId) {
        messageRepo.deleteById(messageId);
    }

    @Override
    public List<Message> getMessages(Long privateChatId) {
        return messageRepo.getMessagesByPrivateChatId(privateChatId);
    }

    @Override
    public Optional<Message> getLastMessageForPrivateChat(Long privateChatId) {
        return messageRepo.findTopByPrivateChatIdOrderByCreatedAtDesc(privateChatId);
    }
}
