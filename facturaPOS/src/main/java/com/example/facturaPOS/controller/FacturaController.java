package com.example.facturaPOS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.service.FacturaService;

@RestController
@RequestMapping("/facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping
    public ResponseEntity<List<Factura>> obtenerTodasLasFacturas() {
        return ResponseEntity.ok(facturaService.obtenerTodasLasFacturas());
    }

    @PostMapping
    public ResponseEntity<Factura> generarFactura(@RequestParam Long idPedido, @RequestParam Long idTipoFactura) {
        Factura factura = facturaService.generarFactura(idPedido, idTipoFactura);
        if (factura != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(factura);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
