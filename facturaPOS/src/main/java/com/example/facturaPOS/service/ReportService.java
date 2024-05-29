package com.example.facturaPOS.service;

import com.example.facturaPOS.model.Factura;
import com.example.facturaPOS.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private FacturaRepository facturaRepository;

    // Método para consultar factura por número
    public Factura consultarFacturaPorNumero(int numeroFactura) {
        return facturaRepository.generateSalesReportByInvoiceNumber(numeroFactura);
    }

    // Método para buscar facturas por cliente
    public List<Factura> buscarFacturasPorCliente(int idCliente) {
        return facturaRepository.findVentasPorCliente(idCliente);
    }

    // Método para buscar ventas del día
    public List<Factura> buscarVentasDelDia(Date fecha) {
        return facturaRepository.findVentasDelDia(fecha);
    }

    // Método para buscar ventas por mes
    public List<Factura> buscarVentasPorMes(int mes) {
        return facturaRepository.findVentasPorMes(mes);
    }
}
