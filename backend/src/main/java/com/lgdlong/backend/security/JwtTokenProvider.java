package com.lgdlong.backend.security;

import com.lgdlong.backend.dto.*;
import com.lgdlong.backend.enums.*;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Getter
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long validityInMilliseconds = 3600000; // 1 giờ

    public String generateToken(UserTokenInfo payload) {
        Date issuedAt = new Date(payload.getIat() * 1000);
        Date expiry = new Date(payload.getExp() * 1000);

        return Jwts.builder()
                .setSubject(payload.getId().toString())
                .claim("username", payload.getUsername())
                .claim("email", payload.getEmail())
                .claim("phone", payload.getPhone())
                .claim("role", payload.getRole().name())
                .claim("status", payload.getStatus().name())        // ✅ thêm status
                .claim("createdAt", payload.getCreatedAt())         // ✅ thêm createdAt (epoch seconds)
                .setIssuedAt(issuedAt)
                .setExpiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    public UserTokenInfo getPayload(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return new UserTokenInfo(
                Long.valueOf(claims.getSubject()),
                claims.get("username", String.class),
                claims.get("phone", String.class),
                claims.get("email", String.class),
                UserRole.fromString(claims.get("role", String.class)),
                UserStatus.valueOf(claims.get("status", String.class)),       // ✅ parse status
                claims.getIssuedAt().getTime() / 1000,
                claims.getExpiration().getTime() / 1000,
                claims.get("createdAt", Long.class)                          // ✅ parse createdAt
        );
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
