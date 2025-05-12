package com.lgdlong.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RecallResponse {
    private Long id;
    private Boolean isRevoked;
    private LocalDateTime revokedAt;
}
