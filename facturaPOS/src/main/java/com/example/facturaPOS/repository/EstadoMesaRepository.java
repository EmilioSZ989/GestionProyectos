package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.EstadoMesa;

@Repository
public interface EstadoMesaRepository extends JpaRepository<EstadoMesa, Long> {
}
