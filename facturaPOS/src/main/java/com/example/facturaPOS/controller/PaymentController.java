package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pago;
import com.example.facturaPOS.model.TipoPago;
import com.example.facturaPOS.repository.PagoRepository;
import com.example.facturaPOS.repository.FacturaRepository;
import com.example.facturaPOS.repository.TipoPagoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private TipoPagoRepository tipoPagoRepository;

    @PostMapping("/create")
    public ResponseEntity<Pago> createPayment(
            @RequestParam Integer facturaId,
            @RequestParam Integer tipoPagoId,
            @RequestParam BigDecimal cantidadRecibida) {

        Optional<Factura> facturaOptional = facturaRepository.findById(facturaId);
        Optional<TipoPago> tipoPagoOptional = tipoPagoRepository.findById(tipoPagoId);

        if (facturaOptional.isPresent() && tipoPagoOptional.isPresent()) {
            Factura factura = facturaOptional.get();
            TipoPago tipoPago = tipoPagoOptional.get();

            BigDecimal subtotal = factura.getPedido().getSubtotal();
            BigDecimal propina = factura.getPedido().getPropina();
            BigDecimal iva = factura.getPedido().getIVA();

            if (subtotal == null) subtotal = BigDecimal.ZERO;
            if (propina == null) propina = BigDecimal.ZERO;
            if (iva == null) iva = BigDecimal.ZERO;

            BigDecimal totalFactura = subtotal.add(propina).add(iva);

            BigDecimal cambio;
            if (cantidadRecibida != null && totalFactura != null) {
                cambio = cantidadRecibida.subtract(totalFactura);
            } else {
                cambio = BigDecimal.ZERO; // Manejar la situación donde cantidadRecibida o totalFactura es nulo
            }

            Pago pago = new Pago();
            pago.setFactura(factura);
            pago.setTipoPago(tipoPago);
            pago.setCantidadRecibida(cantidadRecibida);
            pago.setCambio(cambio);

            Pago savedPago = pagoRepository.save(pago);

            return ResponseEntity.ok(savedPago);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}

