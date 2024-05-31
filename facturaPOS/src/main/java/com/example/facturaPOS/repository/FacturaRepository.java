package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    
    @Query("SELECT f FROM Factura f WHERE f.pedido.cliente.idCliente = :clienteId")
    List<Factura> findByClienteId(@Param("clienteId") Long clienteId);
}
