package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.EmployeeDTO;
import com.canteen_management.backend.dto.ItemDTO;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Item;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.repository.ItemRepository;
import com.canteen_management.backend.service.impl.AdminServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private AdminServiceImpl adminService;

    private Employee employee;
    private EmployeeDTO employeeDTO;
    private Item item;
    private ItemDTO itemDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        employee = Employee.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .balance(100.0)
                .role("ADMIN")
                .build();

        employeeDTO = EmployeeDTO.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .balance(100.0)
                .role("ADMIN")
                .build();

        item = Item.builder()
                .id(1L)
                .name("Coffee")
                .description("Hot coffee")
                .price(10.0)
                .quantity(5)
                .build();

        itemDTO = ItemDTO.builder()
                .id(1L)
                .name("Coffee")
                .description("Hot coffee")
                .price(10.0)
                .quantity(5)
                .build();
    }

    // ----------- EMPLOYEE TESTS -----------

    @Test
    void testGetAllEmployees() {
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee));

        List<EmployeeDTO> employees = adminService.getAllEmployees();

        assertEquals(1, employees.size());
        assertEquals("John Doe", employees.get(0).getName());
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testGetEmployeeById_Found() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        EmployeeDTO result = adminService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
    }

    @Test
    void testGetEmployeeById_NotFound() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        EmployeeDTO result = adminService.getEmployeeById(1L);

        assertNull(result);
    }

    @Test
    void testCreateEmployee() {
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        EmployeeDTO result = adminService.createEmployee(employeeDTO);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void testUpdateEmployee_Found() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        EmployeeDTO updatedDTO = employeeDTO;
        updatedDTO.setName("Jane Doe");

        EmployeeDTO result = adminService.updateEmployee(1L, updatedDTO);

        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void testUpdateEmployee_NotFound() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        EmployeeDTO result = adminService.updateEmployee(1L, employeeDTO);

        assertNull(result);
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    void testDeleteEmployee() {
        adminService.deleteEmployee(1L);

        verify(employeeRepository, times(1)).deleteById(1L);
    }

    // ----------- ITEM TESTS -----------

    @Test
    void testGetAllItems() {
        when(itemRepository.findAll()).thenReturn(Arrays.asList(item));

        List<ItemDTO> items = adminService.getAllItems();

        assertEquals(1, items.size());
        assertEquals("Coffee", items.get(0).getName());
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void testGetItemById_Found() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        ItemDTO result = adminService.getItemById(1L);

        assertNotNull(result);
        assertEquals("Coffee", result.getName());
    }

    @Test
    void testGetItemById_NotFound() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> adminService.getItemById(1L));
        assertEquals("Item not found", ex.getMessage());
    }

    @Test
    void testCreateItem() {
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        ItemDTO result = adminService.createItem(itemDTO);

        assertNotNull(result);
        assertEquals("Coffee", result.getName());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void testUpdateItem_Found() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        ItemDTO updatedDTO = itemDTO;
        updatedDTO.setName("Tea");

        ItemDTO result = adminService.updateItem(1L, updatedDTO);

        assertNotNull(result);
        assertEquals("Tea", result.getName());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void testUpdateItem_NotFound() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> adminService.updateItem(1L, itemDTO));
        assertEquals("Item not found", ex.getMessage());
        verify(itemRepository, never()).save(any(Item.class));
    }

    @Test
    void testDeleteItem() {
        adminService.deleteItem(1L);

        verify(itemRepository, times(1)).deleteById(1L);
    }
}
