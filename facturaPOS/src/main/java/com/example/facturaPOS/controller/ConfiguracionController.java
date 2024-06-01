package com.example.facturaPOS.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.service.ConfiguracionService;

@RestController
@RequestMapping("/configuracion")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService configuracionService;

    @PutMapping("/iva")
    public ResponseEntity<BigDecimal> modificarIVA(@RequestParam BigDecimal nuevoIVA) {
        BigDecimal nuevoValorIVA = configuracionService.modificarIVA(nuevoIVA);
        return ResponseEntity.ok(nuevoValorIVA);
    }


    @GetMapping("/iva")
    public ResponseEntity<BigDecimal> obtenerIVA() {
        BigDecimal iva = configuracionService.obtenerIVA();
        return ResponseEntity.ok(iva);
    }

    @PostMapping("/iva")
    public ResponseEntity<Void> inicializarIVA(@RequestParam BigDecimal iva) {
        configuracionService.inicializarIVA(iva);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
