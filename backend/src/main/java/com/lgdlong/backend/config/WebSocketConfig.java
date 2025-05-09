package com.lgdlong.backend.config;

import org.springframework.context.annotation.*;
import org.springframework.messaging.simp.config.*;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Đăng ký endpoint WebSocket để client kết nối vào
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // Client sẽ kết nối tới đây
                .setAllowedOriginPatterns("*")
                .withSockJS(); // Cho phép fallback nếu browser không hỗ trợ WebSocket
    }

    /**
     * Cấu hình broker cho gửi/nhận message qua WebSocket
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // ✅ Prefix cho client SUBSCRIBE nhận tin nhắn từ server
        registry.enableSimpleBroker("/chat-room", "/user");

        // ✅ Prefix riêng cho gửi đến 1 user (notification cá nhân)
        registry.setUserDestinationPrefix("/user");

        // ✅ Prefix cho client SEND tin nhắn đến server
        registry.setApplicationDestinationPrefixes("/app");
    }
}