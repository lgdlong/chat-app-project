package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.*;

@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {

    private final WebSocketMessageService webSocketMessageService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessagePayload chatPayload) {
        webSocketMessageService.handleIncomingMessage(chatPayload);
    }

}