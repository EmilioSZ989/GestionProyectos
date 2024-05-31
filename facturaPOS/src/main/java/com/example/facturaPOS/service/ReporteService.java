package com.example.facturaPOS.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.repository.FacturaRepository;
import com.example.facturaPOS.repository.PedidoRepository;

@Service
public class ReporteService {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> generarReporteVentas(String tipo) {
        LocalDate inicio;
        LocalDate fin = LocalDate.now();
        
        if ("diario".equalsIgnoreCase(tipo)) {
            inicio = LocalDate.now();
        } else if ("mensual".equalsIgnoreCase(tipo)) {
            inicio = YearMonth.now().atDay(1);
        } else {
            throw new IllegalArgumentException("Tipo de reporte no soportado: " + tipo);
        }

        return pedidoRepository.findByFechaPedidoBetween(inicio, fin);
    }

    public Factura consultarFacturaPorNumero(Long numeroFactura) {
        return facturaRepository.findById(numeroFactura)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con el número: " + numeroFactura));
    }

    public List<Factura> buscarFacturasPorCliente(Long clienteId) {
        return facturaRepository.findByClienteId(clienteId);
    }
}
