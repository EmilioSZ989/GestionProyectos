package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    @Query("SELECT f FROM Factura f WHERE f.fechaEmision = ?1")
    List<Factura> findAllByFechaEmision(LocalDate fecha);

    @Query("SELECT f FROM Factura f WHERE MONTH(f.fechaEmision) = ?1 AND YEAR(f.fechaEmision) = ?2")
    List<Factura> findAllByFechaEmisionMonthAndFechaEmisionYear(int month, int year);

    @Query("SELECT f FROM Factura f WHERE f.pedido.cliente = ?1")
    List<Factura> findAllByPedido_Cliente(Cliente cliente);
}
