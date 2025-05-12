package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.RecallResponse;
import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PatchMapping("/{messageId}/revoke")
    public RecallResponse revokeMessage(
            @PathVariable Long messageId,
            Principal principal  // giả sử bạn cấu hình Spring Security, principal.getName() trả về userId
    ) {
        Long currentUserId = Long.valueOf(principal.getName());
        Message revoked = messageService.revokeMessage(messageId, currentUserId);
        return new RecallResponse(
                revoked.getId(),
                revoked.getIsRevoked(),
                revoked.getRevokedAt()
        );
    }


//    @GetMapping("/private/{privateChatId}")
//public ResponseEntity<Page<MessageDto>> getPrivateChatMessages(
//        @PathVariable Long privateChatId,
//        @RequestParam(defaultValue = "0") int page,
//        @RequestParam(defaultValue = "20") int size) {
//            Page<MessageDto> messagePage = messageService
//                           .getMessages(privateChatId, PageRequest.of(page, size))
//                            .map(messageMapper::toDto);   // map entity → DTO
//            return ResponseEntity.ok(messagePage);
}