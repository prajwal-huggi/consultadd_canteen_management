package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.AuthRequest;
import com.canteen_management.backend.dto.AuthResponse;
import com.canteen_management.backend.dto.EmployeeDTO;

public interface AuthService {
    EmployeeDTO registerAdmin(EmployeeDTO employeeDTO);
    EmployeeDTO registerEmployee(EmployeeDTO employeeDTO);
    AuthResponse login(AuthRequest authRequest);
    EmployeeDTO getCurrentUserProfile();
}
