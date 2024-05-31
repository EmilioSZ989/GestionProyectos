package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reporte")
public class ReporteVentasController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/ventas")
    public ResponseEntity<List<Pedido>> generarReporteVentas(@RequestParam String tipo) {
        List<Pedido> reporte = reporteService.generarReporteVentas(tipo);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/factura/{numeroFactura}")
    public ResponseEntity<Factura> consultarFactura(@PathVariable Long numeroFactura) {
        Factura factura = reporteService.consultarFacturaPorNumero(numeroFactura);
        return ResponseEntity.ok(factura);
    }

    @GetMapping("/facturas")
    public ResponseEntity<List<Factura>> buscarFacturasPorCliente(@RequestParam Long clienteId) {
        List<Factura> facturas = reporteService.buscarFacturasPorCliente(clienteId);
        return ResponseEntity.ok(facturas);
    }
}
