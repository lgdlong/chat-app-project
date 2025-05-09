package com.lgdlong.backend.service;

import com.lgdlong.backend.enums.*;

public interface MessageStatusService {
    void updateStatus(Long messageId, Long userId, DeliveryStatus status);
}
