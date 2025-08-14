package com.canteen_management.backend.entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmployeeTest {

    @Test
    void testIsAdmin_WhenRoleIsAdmin_ShouldReturnTrue() {
        Employee employee = Employee.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .password("secret")
                .balance(100.0)
                .role("ADMIN")
                .build();

        assertTrue(employee.isAdmin());
    }

    @Test
    void testIsAdmin_WhenRoleIsNotAdmin_ShouldReturnFalse() {
        Employee employee = new Employee();
        employee.setRole("USER");

        assertFalse(employee.isAdmin());
    }

    @Test
    void testNoArgsConstructorAndSetters() {
        Employee employee = new Employee();
        employee.setId(2L);
        employee.setName("Jane Doe");
        employee.setEmail("jane@example.com");
        employee.setPassword("pass");
        employee.setBalance(50.0);
        employee.setRole("USER");

        assertEquals(2L, employee.getId());
        assertEquals("Jane Doe", employee.getName());
        assertEquals("jane@example.com", employee.getEmail());
        assertEquals("pass", employee.getPassword());
        assertEquals(50.0, employee.getBalance());
        assertEquals("USER", employee.getRole());
    }

    @Test
    void testAllArgsConstructor() {
        Employee employee = new Employee(3L, "Mike", "mike@example.com", "pwd", 200.0, "ADMIN");

        assertEquals(3L, employee.getId());
        assertEquals("Mike", employee.getName());
        assertEquals("mike@example.com", employee.getEmail());
        assertEquals("pwd", employee.getPassword());
        assertEquals(200.0, employee.getBalance());
        assertEquals("ADMIN", employee.getRole());
    }

    @Test
    void testEqualsAndHashCode() {
        Employee e1 = Employee.builder().id(1L).email("same@example.com").build();
        Employee e2 = Employee.builder().id(1L).email("same@example.com").build();

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
    }

    @Test
    void testToString_NotNull() {
        Employee employee = Employee.builder().id(10L).name("Alex").build();
        assertNotNull(employee.toString());
    }
}
