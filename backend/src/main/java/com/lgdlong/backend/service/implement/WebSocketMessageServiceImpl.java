package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.messaging.simp.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class WebSocketMessageServiceImpl implements WebSocketMessageService {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public void handleIncomingMessage(ChatMessagePayload payload) {
        // ✅ Lưu message vào DB
        Message saved = messageService.createMessage(
                payload.getPrivateChatId(),
                payload.getSenderId(),
                payload.getContent()
        );

        // ✅ Gửi tới tất cả client trong đoạn chat
        messagingTemplate.convertAndSend(
                "/chat-room/private." + payload.getPrivateChatId(),
                saved
        );

        // Debug log
        System.out.println("✅ Message saved: " + saved.getId() + " by user " + saved.getSenderId());
    }
}
