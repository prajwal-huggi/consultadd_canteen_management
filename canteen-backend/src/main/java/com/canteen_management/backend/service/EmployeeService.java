package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Purchase;

import java.util.List;

public interface EmployeeService {
    Purchase purchaseItem(Long employeeId, PurchaseRequest request);
    List<Purchase> getPurchaseHistory(Employee employee);
}

