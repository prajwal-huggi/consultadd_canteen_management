package com.canteen_management.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.canteen_management.backend.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
