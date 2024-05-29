package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Mesa;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.service.MesaService;
import com.example.facturaPOS.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mesa")
public class MesaController {

    @Autowired
    private MesaService mesaService;

    @Autowired
    private PedidoService pedidoService;

    /*@PostMapping("/assignPedido")
    public String assignPedidoToMesa(@RequestParam("mesaId") Integer mesaId, @RequestParam("pedidoId") Integer pedidoId) {
        Mesa mesa = mesaService.findById(mesaId);
        Optional<Pedido> pedidoOptional = pedidoService.findById(pedidoId);

        if (mesa != null && pedidoOptional.isPresent()) {
            Pedido pedido = pedidoOptional.get();
            pedido.setMesa(mesa);
            pedidoService.savePedido(pedido);
            return "Pedido assigned to Mesa successfully!";
        } else {
            return "Mesa or Pedido not found!";
        }
    }*/

    @GetMapping("/status")
    public List<Mesa> getAllMesas() {
        return mesaService.findAll();
    }
}

