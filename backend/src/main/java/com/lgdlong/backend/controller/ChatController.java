package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.mapper.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.security.core.annotation.*;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final UserService userService;
    private final MessageService messageService;
    private final PrivateChatService privateChatService;
    private final ChatMapper chatMapper;

    /**
     * Tạo một cuộc trò chuyện riêng tư 1v1.
     * Endpoint: POST /api/chats/private
     */
    @PostMapping("/private")
    public ResponseEntity<ChatListItemDTO> createPrivateChat(
            @RequestBody CreatePrivateChatRequest req,
            @AuthenticationPrincipal Jwt jwt) {

        Long currentUserId = Long.valueOf(jwt.getSubject());
        PrivateChat newPrivateChat = privateChatService.createOrGetChat(
                currentUserId,
                req.getTargetUserId()
        );
        User targetUser = userService.getUserById(req.getTargetUserId());
        Message lastMessage = messageService.getLastMessageForPrivateChat(newPrivateChat.getId()).orElse(null);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(chatMapper.toDTO(newPrivateChat, targetUser, lastMessage));
    }

    @GetMapping
    public ResponseEntity<List<ChatListItemDTO>> getChats(@AuthenticationPrincipal Jwt jwt) {
        Long currentUserId = Long.valueOf(jwt.getSubject()); // sub trong token là userId

        List<ChatListItemDTO> chats = new ArrayList<>(privateChatService.getAllChatsForUser(currentUserId));
        return ResponseEntity.ok(chats);
    }

//    @PostMapping("/group")
//    public void createGroupChat(
//            @RequestBody CreateGroupChatRequest req,
//            @AuthenticationPrincipal Jwt jwt) {
//        //...
//    }
}
