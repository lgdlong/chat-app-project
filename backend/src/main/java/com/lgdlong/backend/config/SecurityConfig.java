package com.lgdlong.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.*;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // ❌ Tắt CSRF vì bạn đang làm REST API (không dùng session, cookie)
                .csrf(csrf -> csrf.disable())

                // ✅ Bật CORS để dùng cấu hình trong CorsConfig (WebMvcConfigurer)
                .cors(Customizer.withDefaults())

                // ✅ Phân quyền route
                .authorizeHttpRequests(auth -> auth
                        // Các route public, không cần token
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register",
                                "/api/users/search" // endpoint tìm user
                        ).permitAll()

                        // Các route khác cần xác thực bằng JWT
                        .anyRequest().authenticated()
                )

                // ✅ Dùng JWT để xác thực cho REST API
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                )

                // ❌ Tắt login form mặc định của Spring Security
                .formLogin(form -> form.disable());

        return http.build();
    }


//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOriginPatterns(List.of("http://localhost:3000")); // <== key point
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
