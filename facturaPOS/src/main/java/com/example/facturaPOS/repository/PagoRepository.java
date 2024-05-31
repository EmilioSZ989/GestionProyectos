package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
}