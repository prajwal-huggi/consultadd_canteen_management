package com.canteen_management.backend.service;

import com.canteen_management.backend.dto.PurchaseRequest;
import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.entity.Item;
import com.canteen_management.backend.entity.Purchase;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.repository.ItemRepository;
import com.canteen_management.backend.repository.PurchaseRepository;
import com.canteen_management.backend.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private PurchaseRepository purchaseRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee employee;
    private Item item;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        employee = Employee.builder()
                .id(1L)
                .name("John Doe")
                .balance(100.0)
                .build();

        item = Item.builder()
                .id(1L)
                .name("Coffee")
                .price(10.0)
                .quantity(5)
                .build();
    }

    @Test
    void testPurchaseItem_Success() {
        PurchaseRequest request = new PurchaseRequest();
        request.setItemId(1L);
        request.setQuantity(2);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(purchaseRepository.save(any(Purchase.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Purchase purchase = employeeService.purchaseItem(1L, request);

        assertEquals(2, purchase.getQuantity());
        assertEquals(20.0, purchase.getTotalPrice());
        assertEquals(3, item.getQuantity()); // stock reduced
        assertEquals(80.0, employee.getBalance()); // balance reduced

        verify(itemRepository, times(1)).save(item);
        verify(employeeRepository, times(1)).save(employee);
        verify(purchaseRepository, times(1)).save(any(Purchase.class));
    }

    @Test
    void testPurchaseItem_InsufficientStock() {
        PurchaseRequest request = new PurchaseRequest();
        request.setItemId(1L);
        request.setQuantity(10); // more than stock

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> employeeService.purchaseItem(1L, request));

        assertEquals("Not enough stock available", ex.getMessage());
        verify(purchaseRepository, never()).save(any());
    }

    @Test
    void testPurchaseItem_InsufficientBalance() {
        PurchaseRequest request = new PurchaseRequest();
        request.setItemId(1L);
        request.setQuantity(20); // would cost more than balance

        item.setQuantity(30); // enough stock
        item.setPrice(10.0); // total 200, balance is 100

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> employeeService.purchaseItem(1L, request));

        assertEquals("Insufficient balance", ex.getMessage());
        verify(purchaseRepository, never()).save(any());
    }

    @Test
    void testPurchaseItem_EmployeeNotFound() {
        PurchaseRequest request = new PurchaseRequest();
        request.setItemId(1L);
        request.setQuantity(1);

        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> employeeService.purchaseItem(1L, request));

        assertEquals("Employee not found", ex.getMessage());
    }

    @Test
    void testPurchaseItem_ItemNotFound() {
        PurchaseRequest request = new PurchaseRequest();
        request.setItemId(1L);
        request.setQuantity(1);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> employeeService.purchaseItem(1L, request));

        assertEquals("Item not found", ex.getMessage());
    }
}
