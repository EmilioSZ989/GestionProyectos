// EstadoPedidoService.java
package com.example.facturaPOS.service;

import com.example.facturaPOS.model.EstadoPedido;
import com.example.facturaPOS.repository.EstadoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class EstadoPedidoService {

    @Autowired
    private EstadoPedidoRepository estadoPedidoRepository;

    public Optional<EstadoPedido> findByEstado(String estadoPedido) {
        return estadoPedidoRepository.findByEstadoPedido(estadoPedido);
    }
}
