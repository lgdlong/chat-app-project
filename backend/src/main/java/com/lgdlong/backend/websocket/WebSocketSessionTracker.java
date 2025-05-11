package com.lgdlong.backend.websocket;

import org.springframework.stereotype.*;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;

@Component
public class WebSocketSessionTracker {

    // sessionId → username
    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();

    public void sessionConnected(String sessionId, String username) {
        sessionUserMap.put(sessionId, username);
        System.out.println("🟢 Connected: " + username + " (" + sessionId + ")");
    }

    public void sessionDisconnected(String sessionId) {
        String removed = sessionUserMap.remove(sessionId);
        System.out.println("🔴 Disconnected: " + removed + " (" + sessionId + ")");
    }

    public int getOnlineConnectionCount() {
        return sessionUserMap.size();
    }

    public Set<String> getOnlineUsernames() {
        return new HashSet<>(sessionUserMap.values());
    }

    public Map<String, Long> getOnlineUserCountByUsername() {
        return sessionUserMap.values().stream()
                .collect(Collectors.groupingBy(username -> username, Collectors.counting()));
    }
}
