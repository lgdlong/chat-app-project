package com.lgdlong.backend.enums;

public enum UserRole {
    USER,
    ADMIN;

    public static UserRole fromString(String roleStr) {
        if (roleStr == null) {
            throw new IllegalArgumentException("Role string is null");
        }

        try {
            return UserRole.valueOf(roleStr.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + roleStr);
        }
    }

//    Phiên bản kém bảo mật hơn
//    public static UserRole fromString(String roleStr) {
//        try {
//            return UserRole.valueOf(roleStr.trim().toUpperCase());
//        } catch (Exception e) {
//            return USER; // hoặc ném lỗi nếu cần nghiêm ngặt
//        }
//    }

}
