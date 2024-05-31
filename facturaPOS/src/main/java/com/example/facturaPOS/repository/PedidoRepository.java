package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    @Query("SELECT p FROM Pedido p WHERE p.fechaPedido BETWEEN :inicio AND :fin")
    List<Pedido> findByFechaPedidoBetween(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
