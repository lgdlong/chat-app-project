package com.lgdlong.backend.controller;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message-status")
@RequiredArgsConstructor
public class MessageStatusController {

    private final MessageStatusService messageStatusService;

    @PostMapping("/update")
    public ResponseEntity<Void> updateStatus(@RequestBody MessageStatusUpdateDTO dto) {
        messageStatusService.updateStatus(dto.getMessageId(), dto.getUserId(), dto.getStatus());
        return ResponseEntity.ok().build();
    }
}
