package com.lgdlong.backend.config;

import com.lgdlong.backend.websocket.*;
import lombok.*;
import org.springframework.context.annotation.*;
import org.springframework.messaging.simp.config.*;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    /**
     * Đăng ký endpoint WebSocket để client kết nối vào
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .addInterceptors(jwtHandshakeInterceptor) // ✅ Gắn interceptor để bắt và xác thực token
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    /**
     * Cấu hình broker cho gửi/nhận message qua WebSocket
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/chat-room", "/user"); // ✅ Tin broadcast hoặc user riêng
        registry.setUserDestinationPrefix("/user");         // ✅ Cho @SendToUser
        registry.setApplicationDestinationPrefixes("/app"); // ✅ Cho @MessageMapping
    }
}
