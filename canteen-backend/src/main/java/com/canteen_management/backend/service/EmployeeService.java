package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Purchase;

public interface EmployeeService {
    Purchase purchaseItem(Long employeeId, PurchaseRequest request);
}

