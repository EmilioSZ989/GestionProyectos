package com.example.facturaPOS.controller;

import com.example.facturaPOS.service.PedidoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tip")
public class TipController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/calculate/{id}")
    public String calculateTip(@PathVariable Integer id, @RequestParam("tipPercentage") Float tipPercentage) {
        boolean success = pedidoService.calculateAndSaveTip(id, tipPercentage);
        if (success) {
            return "Tip calculated and updated successfully!";
        } else {
            return "Pedido not found!";
        }
    }

}
