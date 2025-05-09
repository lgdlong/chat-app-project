package com.lgdlong.backend.websocket;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.security.*;
import jakarta.servlet.http.*;
import lombok.*;
import org.jetbrains.annotations.*;
import org.springframework.http.server.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.*;
import org.springframework.stereotype.*;
import org.springframework.web.socket.*;
import org.springframework.web.socket.server.*;

import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean beforeHandshake(
            @NotNull ServerHttpRequest request,
            @NotNull ServerHttpResponse response,
            @NotNull WebSocketHandler wsHandler,
            @NotNull Map<String, Object> attributes
    ) {
        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpRequest = servletRequest.getServletRequest();
            String token = httpRequest.getParameter("token");

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            if (token != null && jwtTokenProvider.validateToken(token)) {
                UserTokenInfo payload = jwtTokenProvider.getPayload(token);

                // Tạo đối tượng authentication đơn giản với ID và role (không dùng password)
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        payload.getUsername(), null, Collections.emptyList()
                );

                // Gán vào SecurityContext (chỉ áp dụng nếu bạn cần tra cứu user phía sau)
                SecurityContextHolder.getContext().setAuthentication(auth);

                System.out.println("✅ WebSocket Authenticated user: " + payload.getUsername());

                return true; // ✅ Cho phép kết nối
            } else {
                System.out.println("❌ WebSocket Authentication failed: " + 
                        (token == null ? "Missing token" : "Invalid token"));
                return false; // ❌ Không hợp lệ → từ chối WebSocket
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(
            @NotNull ServerHttpRequest request,
            @NotNull ServerHttpResponse response,
            @NotNull WebSocketHandler wsHandler,
            Exception exception
    ) {
        // Không cần xử lý gì sau khi bắt tay
    }
}
