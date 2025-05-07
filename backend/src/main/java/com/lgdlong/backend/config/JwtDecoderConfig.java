package com.lgdlong.backend.config;

import com.lgdlong.backend.security.*;
import org.springframework.context.annotation.*;
import org.springframework.security.oauth2.jwt.*;

@Configuration
public class JwtDecoderConfig {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtDecoderConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(jwtTokenProvider.getSecretKey()).build();
    }
}
