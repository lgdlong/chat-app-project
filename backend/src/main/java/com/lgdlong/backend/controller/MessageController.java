package com.lgdlong.backend.controller;

import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    /**
     * API lấy 20 tin nhắn mới nhất trong đoạn chat 1-1
     *
     * @param privateChatId ID của đoạn chat
     * @return danh sách 20 tin nhắn gần nhất
     */
    @GetMapping("/private/{privateChatId}")
    public ResponseEntity<?> getPrivateChatMessages(@PathVariable Long privateChatId) {
        try {
            Page<Message> messagePage = messageService.getMessages(privateChatId, PageRequest.of(0, 20));
            List<Message> messages = messagePage.getContent();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body("❌ Chat not found or not accessible: " + e.getMessage());
        }
    }
}