package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.ItemMenu;

@Repository
public interface ItemMenuRepository extends JpaRepository<ItemMenu, Long> {
}
