package com.canteen_management.backend.service.impl;

import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.dto.ItemDTO;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Item;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.repository.ItemRepository;
import com.canteen_management.backend.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private EmployeeRepository employeeRepository;
    private ItemRepository itemRepository ;

    @Autowired
    public  AdminServiceImpl(EmployeeRepository employeeRepository ,ItemRepository itemRepository ){
        this.employeeRepository = employeeRepository;
        this.itemRepository = itemRepository ;
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = convertToEntity(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        return employeeRepository.findById(id)
                .map(existing -> {
                    existing.setName(employeeDTO.getName());
                    existing.setEmail(employeeDTO.getEmail());
                    existing.setBalance(employeeDTO.getBalance());
                    existing.setRole(employeeDTO.getRole());
                    Employee updated = employeeRepository.save(existing);
                    return convertToDTO(updated);
                })
                .orElse(null);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        return EmployeeDTO.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .balance(employee.getBalance())
                .role(employee.getRole())
                .build();
    }

    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setBalance(dto.getBalance());
        employee.setRole(dto.getRole());
        return employee;
    }

    // ...................................................

    private ItemDTO convertToItemDTO(Item item) {
        return ItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .build();
    }

    private Item convertToItemEntity(ItemDTO dto) {
        Item item = new Item();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setQuantity(dto.getQuantity());
        return item;
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToItemDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDTO getItemById(Long id) {
        return itemRepository.findById(id)
                .map(this::convertToItemDTO)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @Override
    public ItemDTO createItem(ItemDTO itemDTO) {
        Item savedItem = itemRepository.save(convertToItemEntity(itemDTO));
        return convertToItemDTO(savedItem);
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO updatedItemDTO) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItemDTO.getName());
                    item.setDescription(updatedItemDTO.getDescription());
                    item.setPrice(updatedItemDTO.getPrice());
                    item.setQuantity(updatedItemDTO.getQuantity());
                    return convertToItemDTO(itemRepository.save(item));
                })
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElse(null);  // return null if no employee found, or throw exception if you prefer
    }
}
