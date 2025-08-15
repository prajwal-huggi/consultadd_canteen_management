package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.dto.ItemDTO;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Purchase;

import java.util.List;

public interface AdminService {

    // Employee CRUD
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);

    // Item CRUD
    List<ItemDTO> getAllItems();
    ItemDTO getItemById(Long id);
    ItemDTO createItem(ItemDTO itemDTO);
    ItemDTO updateItem(Long id, ItemDTO updatedItemDTO);
    void deleteItem(Long id);

    Employee findByEmail(String email);
}
