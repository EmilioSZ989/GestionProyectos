package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.service.PedidoService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/factura")
public class FacturaController {

    @Autowired
    private PedidoService pedidoService;

    /*@GetMapping("/generate/{id}")
    public String generateFactura(@PathVariable Integer id) {
        Optional<Pedido> pedido = pedidoService.findById(id);
        if (pedido != null) {
            // Logic to generate and return the invoice
            return "Factura generated successfully!";
        } else {
            return "Pedido not found!";
        }
    }*/
}
