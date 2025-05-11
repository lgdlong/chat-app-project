package com.lgdlong.backend.websocket;

import lombok.*;
import org.springframework.context.event.*;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.stereotype.*;
import org.springframework.web.socket.messaging.*;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final WebSocketSessionTracker tracker;

    @EventListener
    public void handleConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        if (sessionId != null && accessor.getUser() != null) {
            String username = accessor.getUser().getName();
            tracker.sessionConnected(sessionId, username);
        }
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        if (sessionId != null) {
            tracker.sessionDisconnected(sessionId);
        }
    }
}
