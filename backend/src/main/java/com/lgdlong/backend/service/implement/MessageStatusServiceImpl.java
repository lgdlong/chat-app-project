package com.lgdlong.backend.service.implement;

import com.lgdlong.backend.entity.*;
import com.lgdlong.backend.enums.*;
import com.lgdlong.backend.repo.*;
import com.lgdlong.backend.service.*;
import lombok.*;
import org.springframework.stereotype.*;

import java.time.*;

@Service
@RequiredArgsConstructor
public class MessageStatusServiceImpl implements MessageStatusService {

    private final MessageStatusRepo messageStatusRepo;

    @Override
    public void updateStatus(Long messageId, Long userId, DeliveryStatus status) {
        MessageStatus statusRecord = messageStatusRepo
                .findByMessageIdAndUserId(messageId, userId)
                .orElse(new MessageStatus(messageId, userId, status, LocalDateTime.now()));

        statusRecord.setStatus(status);
        statusRecord.setUpdatedAt(LocalDateTime.now());

        messageStatusRepo.save(statusRecord);
    }
}
