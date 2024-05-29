package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "http://localhost:8080")
public class ReportController {

    @Autowired
    private ReportService reportService;

	 // Endpoint para generar reporte de ventas diario o mensual
	    @GetMapping("/ventas")
	    public ResponseEntity<List<Factura>> generarReporteVentas(@RequestParam("tipo") String tipo) {
	        try {
	            if (tipo.equals("diario")) {
	                Date fechaActual = new Date();
	                List<Factura> reporteDiario = reportService.buscarVentasDelDia(fechaActual);
	                return ResponseEntity.ok(reporteDiario);
	            } else if (tipo.equals("mensual")) {
	                Calendar calendar = Calendar.getInstance();
	                int mesActual = calendar.get(Calendar.MONTH) + 1; // Se suma 1 porque los meses en Calendar empiezan en 0
	                List<Factura> reporteMensual = reportService.buscarVentasPorMes(mesActual);
	                return ResponseEntity.ok(reporteMensual);
	            } else {
	                return ResponseEntity.badRequest().body(null);
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }


    // Endpoint para consultar factura por número
    @GetMapping("/factura/{numero}")
    public ResponseEntity<Factura> consultarFacturaPorNumero(@PathVariable("numero") int numeroFactura) {
        Factura factura = reportService.consultarFacturaPorNumero(numeroFactura);
        return ResponseEntity.ok().body(factura);
    }

    // Endpoint para buscar facturas por cliente
    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<Factura>> buscarFacturasPorCliente(@PathVariable("id") int idCliente) {
        List<Factura> facturasCliente = reportService.buscarFacturasPorCliente(idCliente);
        return ResponseEntity.ok().body(facturasCliente);
    }
}

