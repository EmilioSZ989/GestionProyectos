package com.example.facturaPOS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.model.Pago;
import com.example.facturaPOS.model.PagoRequest;
import com.example.facturaPOS.service.PagoService;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @PostMapping
    public ResponseEntity<Pago> procesarPago(@RequestBody PagoRequest pagoRequest) {
        Pago pago = pagoService.procesarPago(pagoRequest.getIdFactura(), pagoRequest.getCantidadRecibida(), pagoRequest.getIdTipoPago());
        if (pago != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(pago);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
