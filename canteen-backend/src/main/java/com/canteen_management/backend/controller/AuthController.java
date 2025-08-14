package com.canteen_management.backend.controller;

import com.canteen_management.backend.dto.AuthRequest;
import com.canteen_management.backend.dto.AuthResponse;
import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup/admin")
    public ResponseEntity<EmployeeDTO> registerAdmin(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdAdmin = authService.registerAdmin(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
    }

    @PostMapping("/signup/employee")
    public ResponseEntity<EmployeeDTO> registerEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = authService.registerEmployee(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        AuthResponse authResponse = authService.login(authRequest);
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<EmployeeDTO> getProfile() {
        EmployeeDTO profile = authService.getCurrentUserProfile();
        return ResponseEntity.ok(profile);
    }
}
