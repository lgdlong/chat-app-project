package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.*;
import org.springframework.stereotype.*;

@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {

    private final WebSocketMessageService webSocketMessageService;
    private final MessageStatusService messageStatusService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessagePayload chatPayload) {
        webSocketMessageService.handleIncomingMessage(chatPayload);

        // Log the message for debugging purposes
        System.out.println("📩 New message from: " + chatPayload.getSenderId());
        System.out.println("📤 Sending to: /chat-room/private." + chatPayload.getPrivateChatId());
    }

    @MessageMapping("/chat.acknowledge")
    public void acknowledgeStatus(@Payload MessageStatusUpdateDTO dto) {
        messageStatusService.updateStatus(dto.getMessageId(), dto.getUserId(), dto.getStatus());

        // Push ngược lại cho người gửi để cập nhật UI
        messagingTemplate.convertAndSend(
                "/chat-room/message-status." + dto.getMessageId(),
                dto
        );
    }

}