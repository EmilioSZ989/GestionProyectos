// EstadoPedidoRepository.java
package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstadoPedidoRepository extends JpaRepository<EstadoPedido, Integer> {
    Optional<EstadoPedido> findByEstadoPedido(String estadoPedido);
}
