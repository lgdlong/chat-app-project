package com.lgdlong.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.util.matcher.*;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF
                .cors(cors -> cors.configure(http)) // Bật CORS
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/auth/login"), // <-- Phải cho phép
                                new AntPathRequestMatcher("/api/auth/register"),
                                new AntPathRequestMatcher("/api/users"),
                                new AntPathRequestMatcher("/api/users/**")
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login.disable()); // Tắt login form mặc định

        return http.build();
    }
}
