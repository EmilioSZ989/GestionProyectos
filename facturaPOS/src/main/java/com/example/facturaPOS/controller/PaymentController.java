package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.EstadoPedido;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.service.EstadoPedidoService;
import com.example.facturaPOS.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private EstadoPedidoService estadoPedidoService;  // Inyectar EstadoPedidoService

    /*@PostMapping("/process/{id}")
    public String processPayment(@PathVariable Integer id, @RequestParam("paymentMethod") String paymentMethod, @RequestParam("amount") BigDecimal amount) {
        Optional<Pedido> optionalPedido = pedidoService.findById(id);
        if (optionalPedido.isPresent()) {
            Pedido pedido = optionalPedido.get();
            if (paymentMethod.equals("cash")) {
                BigDecimal change = amount.subtract(pedido.getTotal());
                // Lógica para manejar el pago en efectivo y el cambio
            } else if (paymentMethod.equals("card")) {
                // Lógica para manejar el pago con tarjeta
            }

            // Buscar el estado "paid" en la base de datos
            Optional<EstadoPedido> optionalEstadoPago = estadoPedidoService.findByEstado("paid");
            if (optionalEstadoPago.isPresent()) {
                EstadoPedido estadoPago = optionalEstadoPago.get();
                pedido.setEstadoPedido(estadoPago);
                pedidoService.savePedido(pedido);
                return "Payment processed successfully!";
            } else {
                return "Payment state 'paid' not found!";
            }
        } else {
            return "Pedido not found!";
        }
    }*/
}

