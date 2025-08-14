package com.canteen_management.backend.service;

import javax.crypto.SecretKey;

public interface JwtService {
    String generateToken(String employeeEmail);
    SecretKey generateKey();
    String getSecreteKey();
    String extractUserName(String token);
    String extractUserRole(String token);
    boolean isValidToken(String token, String email);
    boolean isAdmin(String token);
    String extractEmail(String token);
}
