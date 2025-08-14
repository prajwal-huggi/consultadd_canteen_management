package com.canteen_management.backend.service.impl;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Item;
import com.canteen_management.backend.entity.Purchase;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.repository.ItemRepository;
import com.canteen_management.backend.repository.PurchaseRepository;
import com.canteen_management.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ItemRepository itemRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    public Purchase purchaseItem(Long employeeId, PurchaseRequest request) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Check stock
        if (request.getQuantity() > item.getQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        double totalPrice = item.getPrice() * request.getQuantity();

        // Check balance
        if (employee.getBalance() < totalPrice) {
            throw new RuntimeException("Insufficient balance");
        }

        // Update inventory and balance
        item.setQuantity(item.getQuantity() - request.getQuantity());
        employee.setBalance(employee.getBalance() - totalPrice);

        // Save updated entities
        itemRepository.save(item);
        employeeRepository.save(employee);

        // Record purchase
        Purchase purchase = Purchase.builder()
                .employee(employee)
                .item(item)
                .quantity(request.getQuantity())
                .totalPrice(totalPrice)
                .purchaseDate(LocalDateTime.now())
                .build();

        return purchaseRepository.save(purchase);
    }
}
