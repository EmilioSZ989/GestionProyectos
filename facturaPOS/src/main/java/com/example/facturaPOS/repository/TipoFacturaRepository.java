package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.TipoFactura;

@Repository
public interface TipoFacturaRepository extends JpaRepository<TipoFactura, Long> {
}
