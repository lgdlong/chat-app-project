package com.lgdlong.backend.controller;

import com.lgdlong.backend.websocket.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;

@RestController
@RequestMapping("/api/online")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class OnlineUserController {

    private final WebSocketSessionTracker tracker;
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        // Log the exception
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error retrieving online user data: " + ex.getMessage());
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getOnlineCount() {
        return ResponseEntity.ok(tracker.getOnlineConnectionCount());
    }

    @GetMapping("/usernames")
    public ResponseEntity<Set<String>> getOnlineUsernames() {
        return ResponseEntity.ok(tracker.getOnlineUsernames());
    }

    @GetMapping("/map")
    public ResponseEntity<Map<String, Long>> getOnlineUserMap() {
        return ResponseEntity.ok(tracker.getOnlineUserCountByUsername());
    }
}
