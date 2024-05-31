package com.example.facturaPOS.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.model.TipoFactura;
import com.example.facturaPOS.repository.FacturaRepository;
import com.example.facturaPOS.repository.PedidoRepository;
import com.example.facturaPOS.repository.TipoFacturaRepository;

@Service
public class FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private TipoFacturaRepository tipoFacturaRepository;

    public List<Factura> obtenerTodasLasFacturas() {
        return facturaRepository.findAll();
    }

    public Factura generarFactura(Long idPedido, Long idTipoFactura) {
        // Buscar el pedido por su ID
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + idPedido));

        // Verificar si el tipo de factura existe
        TipoFactura tipoFactura = tipoFacturaRepository.findById(idTipoFactura)
                .orElseThrow(() -> new RuntimeException("Tipo de factura no encontrado con el ID: " + idTipoFactura));

        // Crear una nueva factura
        Factura factura = new Factura();
        factura.setPedido(pedido);
        factura.setTipoFactura(tipoFactura);

        // Establecer la fecha de emisión de la factura
        factura.setFechaEmision(LocalDate.now());

        // Guardar la factura en la base de datos
        return facturaRepository.save(factura);
    }
}
