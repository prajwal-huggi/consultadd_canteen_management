package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.AuthRequest;
import com.canteen_management.backend.dto.AuthResponse;
import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.service.JwtService;
import com.canteen_management.backend.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void login_ShouldReturnAuthResponse_WhenCredentialsValid() {
        // Arrange
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("test@example.com");
        authRequest.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        when(jwtService.generateToken("test@example.com"))
                .thenReturn("mockToken");

        Employee mockEmployee = new Employee();
        mockEmployee.setEmail("test@example.com");
        mockEmployee.setRole("EMPLOYEE");

        when(employeeRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(mockEmployee));

        // Act
        AuthResponse response = authService.login(authRequest);

        // Assert
        assertEquals("mockToken", response.getToken());
        assertEquals("Login successful", response.getMessage());
        assertEquals("EMPLOYEE", response.getRole());

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService).generateToken("test@example.com");
        verify(employeeRepository).findByEmail("test@example.com");
    }

    @Test
    void registerAdmin_ShouldSaveAdminWithEncodedPassword() {
        // Arrange
        EmployeeDTO dto = new EmployeeDTO();
        dto.setName("John Admin");
        dto.setEmail("admin@example.com");
        dto.setPassword("password");

        Employee entity = new Employee();
        entity.setName("John Admin");
        entity.setEmail("admin@example.com");
        entity.setPassword("encodedPassword");
        entity.setRole("ADMIN");

        Employee savedEntity = new Employee();
        savedEntity.setId(1L);
        savedEntity.setName("John Admin");
        savedEntity.setEmail("admin@example.com");
        savedEntity.setPassword("encodedPassword");
        savedEntity.setRole("ADMIN");

        when(modelMapper.map(dto, Employee.class)).thenReturn(entity);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(employeeRepository.save(any(Employee.class))).thenReturn(savedEntity);
        when(modelMapper.map(savedEntity, EmployeeDTO.class)).thenReturn(dto);

        // Act
        EmployeeDTO result = authService.registerAdmin(dto);

        // Assert
        assertEquals("John Admin", result.getName());
        assertEquals("admin@example.com", result.getEmail());
        verify(passwordEncoder).encode("password");
        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    void registerEmployee_ShouldSaveEmployeeWithEncodedPassword() {
        // Arrange
        EmployeeDTO dto = new EmployeeDTO();
        dto.setName("Jane Employee");
        dto.setEmail("employee@example.com");
        dto.setPassword("password");

        Employee entity = new Employee();
        entity.setName("Jane Employee");
        entity.setEmail("employee@example.com");
        entity.setPassword("encodedPassword");
        entity.setRole("EMPLOYEE");

        Employee savedEntity = new Employee();
        savedEntity.setId(2L);
        savedEntity.setName("Jane Employee");
        savedEntity.setEmail("employee@example.com");
        savedEntity.setPassword("encodedPassword");
        savedEntity.setRole("EMPLOYEE");

        when(modelMapper.map(dto, Employee.class)).thenReturn(entity);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(employeeRepository.save(any(Employee.class))).thenReturn(savedEntity);
        when(modelMapper.map(savedEntity, EmployeeDTO.class)).thenReturn(dto);

        // Act
        EmployeeDTO result = authService.registerEmployee(dto);

        // Assert
        assertEquals("Jane Employee", result.getName());
        assertEquals("employee@example.com", result.getEmail());
        verify(passwordEncoder).encode("password");
        verify(employeeRepository).save(any(Employee.class));
    }
}
