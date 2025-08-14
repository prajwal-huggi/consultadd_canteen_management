package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.entity.Item;

import java.util.List;

public interface AdminService {
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);
    List<Item> getAllItems();
    Item getItemById(Long id);
    Item createItem(Item item);
    Item updateItem(Long id, Item updatedItem);
    void deleteItem(Long id);
}
