package com.example.facturaPOS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.facturaPOS.model.CrearPedidoRequest;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/crear")
    public ResponseEntity<Pedido> crearPedido(@RequestBody CrearPedidoRequest request) {
        Pedido pedidoCreado = pedidoService.crearPedido(request.getPedido(), request.getItemsPedido());
        return new ResponseEntity<>(pedidoCreado, HttpStatus.CREATED);
    }
}
