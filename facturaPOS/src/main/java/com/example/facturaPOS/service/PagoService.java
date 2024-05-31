package com.example.facturaPOS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pago;
import com.example.facturaPOS.model.TipoPago;
import com.example.facturaPOS.repository.FacturaRepository;
import com.example.facturaPOS.repository.PagoRepository;
import com.example.facturaPOS.repository.TipoPagoRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class PagoService {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private TipoPagoRepository tipoPagoRepository;

    @Autowired
    private PagoRepository pagoRepository;

    public Pago procesarPago(Long idFactura, BigDecimal cantidadRecibida, Long idTipoPago) {
        // Buscar la factura por su ID
        Factura factura = facturaRepository.findById(idFactura)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada con el ID: " + idFactura));

        // Obtener el tipo de pago por su ID
        TipoPago tipoPago = tipoPagoRepository.findById(idTipoPago)
                .orElseThrow(() -> new RuntimeException("Tipo de pago no encontrado con el ID: " + idTipoPago));

        // Calcular el cambio si el tipo de pago es "Efectivo"
        BigDecimal cambio = BigDecimal.ZERO;
        BigDecimal totalFactura = factura.getPedido().getTotal();

        if (tipoPago.getTipoPago().equalsIgnoreCase("Efectivo")) {
            cambio = cantidadRecibida.subtract(totalFactura);
        } else {
            // Verificar que la cantidad recibida sea igual al total de la factura para otros métodos de pago
            if (cantidadRecibida.compareTo(totalFactura) != 0) {
                throw new RuntimeException("La cantidad recibida debe ser igual al total de la factura para este método de pago.");
            }
        }

        // Crear el objeto Pago
        Pago pago = new Pago();
        pago.setCantidadRecibida(cantidadRecibida);
        pago.setCambio(cambio);
        pago.setFechaEmision(LocalDate.now());
        pago.setTipoPago(tipoPago);
        pago.setFactura(factura);

        // Guardar el pago en la base de datos
        return pagoRepository.save(pago);
    }

}
