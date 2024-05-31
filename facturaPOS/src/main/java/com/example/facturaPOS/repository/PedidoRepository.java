package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT p FROM Pedido p WHERE p.mesa.idMesa = ?1")
    List<Pedido> findAllByIdMesa(Long idMesa);

    @Query("SELECT p FROM Pedido p WHERE p.cliente = ?1")
    List<Pedido> findAllByCliente(com.example.facturaPOS.model.Cliente cliente);
    
    
}
