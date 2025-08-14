package com.canteen_management.backend.controller;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Purchase;
import com.canteen_management.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/{employeeId}/purchase")
    public ResponseEntity<Purchase> purchaseItem(
            @PathVariable Long employeeId,
            @RequestBody PurchaseRequest request) {
        Purchase purchase = employeeService.purchaseItem(employeeId, request);
        return new ResponseEntity<>(purchase, HttpStatus.CREATED);
    }
}
