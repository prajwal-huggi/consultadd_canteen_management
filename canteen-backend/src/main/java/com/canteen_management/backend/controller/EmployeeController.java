package com.canteen_management.backend.controller;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Purchase;
import com.canteen_management.backend.service.AdminService;
import com.canteen_management.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final AdminService adminService ;

    @PostMapping("/{employeeId}/purchase")
    public ResponseEntity<Purchase> purchaseItem(
            @PathVariable Long employeeId,
            @RequestBody PurchaseRequest request) {
        Purchase purchase = employeeService.purchaseItem(employeeId, request);
        return new ResponseEntity<>(purchase, HttpStatus.CREATED);
    }

    @GetMapping("/purchase-history")
    public ResponseEntity<List<Purchase>> getPurchaseHistory(@AuthenticationPrincipal UserDetails userDetails) {
    if (userDetails == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    Employee employee = adminService.findByEmail(userDetails.getUsername());
    if (employee == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    List<Purchase> history = employeeService.getPurchaseHistory(employee);
    return ResponseEntity.ok(history);
}

}
