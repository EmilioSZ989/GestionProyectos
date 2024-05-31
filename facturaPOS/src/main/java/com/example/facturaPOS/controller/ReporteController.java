package com.example.facturaPOS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.model.Pago;
import com.example.facturaPOS.service.ReporteService;

@RestController
@RequestMapping("/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/ventas")
    public ResponseEntity<List<Pago>> generarReporteVentas(@RequestParam String tipo) {
        List<Pago> reporte = reporteService.generarReporteVentas(tipo);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/pagos/{numeroPago}")
    public ResponseEntity<Pago> consultarPagoPorNumero(@PathVariable Long numeroPago) {
        Pago pago = reporteService.consultarPagoPorNumero(numeroPago);
        if (pago != null) {
            return ResponseEntity.ok(pago);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/clientes/{clienteId}/pagos")
    public ResponseEntity<List<Pago>> buscarPagosPorCliente(@PathVariable Long clienteId) {
        List<Pago> pagos = reporteService.buscarPagosPorCliente(clienteId);
        return ResponseEntity.ok(pagos);
    }
}
