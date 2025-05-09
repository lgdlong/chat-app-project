package com.lgdlong.backend.service;

import com.lgdlong.backend.dto.*;

public interface WebSocketMessageService {
    void handleIncomingMessage(ChatMessagePayload payload);
}
