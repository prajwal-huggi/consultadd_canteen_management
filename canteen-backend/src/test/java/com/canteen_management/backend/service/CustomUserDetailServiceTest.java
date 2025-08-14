package com.canteen_management.backend.service;
import com.canteen_management.backend.CustomUserDetails;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CustomUserDetailServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private CustomUserDetailService customUserDetailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_ShouldReturnUserDetails_WhenEmployeeExists() {
        // Arrange
        String email = "john@example.com";
        Employee employee = new Employee();
        employee.setEmail(email);
        employee.setPassword("password123");
        when(employeeRepository.findByEmail(email)).thenReturn(Optional.of(employee));

        // Act
        UserDetails userDetails = customUserDetailService.loadUserByUsername(email);

        // Assert
        assertNotNull(userDetails);
        assertTrue(userDetails instanceof CustomUserDetails);
        assertEquals(email, userDetails.getUsername());
        verify(employeeRepository, times(1)).findByEmail(email);
    }

    @Test
    void loadUserByUsername_ShouldThrowException_WhenEmployeeNotFound() {
        // Arrange
        String email = "nonexistent@example.com";
        when(employeeRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class,
                () -> customUserDetailService.loadUserByUsername(email));

        verify(employeeRepository, times(1)).findByEmail(email);
    }
}
