package com.canteen_management.backend.repository;

import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByEmployee(Employee employee);
}
