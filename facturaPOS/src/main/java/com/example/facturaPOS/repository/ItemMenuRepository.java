package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.facturaPOS.model.Menu;

public interface ItemMenuRepository extends JpaRepository<Menu, Integer> {
}
