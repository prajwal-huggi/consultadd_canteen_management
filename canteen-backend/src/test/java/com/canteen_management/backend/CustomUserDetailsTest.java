package com.canteen_management.backend;

import com.canteen_management.backend.entity.Employee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import static org.assertj.core.api.Assertions.assertThat;

class CustomUserDetailsTest {

    private Employee employee;
    private CustomUserDetails customUserDetails;

    @BeforeEach
    void setUp() {
        employee = Employee.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .password("securePass")
                .role("ADMIN")
                .balance(100.0)
                .build();

        customUserDetails = new CustomUserDetails(employee);
    }

    @Test
    void getPassword_ShouldReturnEmployeePassword() {
        assertThat(customUserDetails.getPassword()).isEqualTo("securePass");
    }

    @Test
    void getId_ShouldReturnEmployeeId() {
        assertThat(customUserDetails.getId()).isEqualTo(1L);
    }

    @Test
    void getRole_ShouldReturnTrue_WhenEmployeeIsAdmin() {
        assertThat(customUserDetails.getRole()).isTrue();
    }

    @Test
    void getUsername_ShouldReturnEmployeeEmail() {
        assertThat(customUserDetails.getUsername()).isEqualTo("john@example.com");
    }

    @Test
    void accountStatusMethods_ShouldAlwaysReturnTrue() {
        assertThat(customUserDetails.isAccountNonExpired()).isTrue();
        assertThat(customUserDetails.isAccountNonLocked()).isTrue();
        assertThat(customUserDetails.isCredentialsNonExpired()).isTrue();
        assertThat(customUserDetails.isEnabled()).isTrue();
    }
}
