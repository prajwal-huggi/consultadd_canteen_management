package com.canteen_management.backend.service;

import com.canteen_management.backend.entity.Employee;

import javax.crypto.SecretKey;

public interface JwtService {
    String generateToken(Employee employeeEmailPassword);
    SecretKey generateKey();
    String getSecreteKey();
    String extractUserName(String token);
    String extractUserRole(String token);
    boolean isValidToken(String token, String email);
    boolean isAdmin(String token);
    String extractEmail(String token);
}
