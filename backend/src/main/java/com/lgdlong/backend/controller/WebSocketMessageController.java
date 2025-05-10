package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.*;
import org.springframework.stereotype.*;

@Controller
@RequiredArgsConstructor
@Slf4j
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
        try {
            messageStatusService.updateStatus(dto.getMessageId(), dto.getUserId(), dto.getStatus());

            // Push ngược lại cho người gửi để cập nhật UI
            messagingTemplate.convertAndSend(
                    "/chat-room/message-status." + dto.getMessageId(),
                    dto
            );
            log.debug("Status updated for message: {}, status: {}", dto.getMessageId(), dto.getStatus());
        } catch (Exception e) {
            log.error("Failed to update message status: {}", e.getMessage(), e);
            // Consider how to handle the error - maybe sending an error message back to the client
        }
    }

}