package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.facturaPOS.model.EstadoPedido;

@Repository
public interface EstadoPedidoRepository extends JpaRepository<EstadoPedido, Long> {
    
    @Query("SELECT e FROM EstadoPedido e WHERE e.estadoPedido = :estado")
    EstadoPedido findByEstadoPedido(@Param("estado") String estado);
}
