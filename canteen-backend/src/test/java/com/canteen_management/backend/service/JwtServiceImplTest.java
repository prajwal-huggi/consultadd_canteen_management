package com.canteen_management.backend.service;

import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.service.impl.JwtServiceImpl;
import io.jsonwebtoken.io.Encoders;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    private String secretKey;

    @InjectMocks
    private JwtServiceImpl jwtService;

    private Employee adminEmployee;
    private Employee normalEmployee;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Generate a Base64 secret key for signing
        byte[] keyBytes = "ThisIsASecretKeyForJwtTesting123456".getBytes();
        secretKey = Base64.getEncoder().encodeToString(keyBytes);

        adminEmployee = Employee.builder()
                .id(1L)
                .email("admin@example.com")
                .name("Admin User")
                .role("ADMIN")
                .build();

        normalEmployee = Employee.builder()
                .id(2L)
                .email("user@example.com")
                .name("Normal User")
                .role("EMPLOYEE")
                .build();

        jwtService = new JwtServiceImpl(secretKey, employeeRepository);
    }

    @Test
    void testGenerateTokenAndExtractClaims_Admin() {
        when(employeeRepository.findByEmail("admin@example.com"))
                .thenReturn(Optional.of(adminEmployee));

        String token = jwtService.generateToken("admin@example.com");

        assertNotNull(token);

        String email = jwtService.extractEmail(token);
        assertEquals("admin@example.com", email);

        boolean isAdmin = jwtService.isAdmin(token);
        assertTrue(isAdmin);
    }

    @Test
    void testGenerateTokenAndExtractClaims_Employee() {
        when(employeeRepository.findByEmail("user@example.com"))
                .thenReturn(Optional.of(normalEmployee));

        String token = jwtService.generateToken("user@example.com");

        assertNotNull(token);

        String email = jwtService.extractEmail(token);
        assertEquals("user@example.com", email);

        boolean isAdmin = jwtService.isAdmin(token);
        assertFalse(isAdmin);
    }

    @Test
    void testIsValidToken_True() {
        when(employeeRepository.findByEmail("admin@example.com"))
                .thenReturn(Optional.of(adminEmployee));

        String token = jwtService.generateToken("admin@example.com");

        boolean valid = jwtService.isValidToken(token, "admin@example.com");
        assertTrue(valid);
    }

    @Test
    void testIsValidToken_False_WrongEmail() {
        when(employeeRepository.findByEmail("admin@example.com"))
                .thenReturn(Optional.of(adminEmployee));

        String token = jwtService.generateToken("admin@example.com");

        boolean valid = jwtService.isValidToken(token, "other@example.com");
        assertFalse(valid);
    }

    @Test
    void testExtractUserRole_Admin() {
        when(employeeRepository.findByEmail("admin@example.com"))
                .thenReturn(Optional.of(adminEmployee));

        String token = jwtService.generateToken("admin@example.com");

        String role = jwtService.extractUserRole(token);
        assertEquals("ADMIN", role);
    }
}

