package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.Mesa;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
}