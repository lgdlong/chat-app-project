package com.lgdlong.backend.controller;

import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/private/{chatId}")
    public ResponseEntity<List<Message>> getPrivateChatMessages(@PathVariable Long chatId) {
        List<Message> messages = messageService.getMessages(chatId);
        return ResponseEntity.ok(messages);
    }
}

