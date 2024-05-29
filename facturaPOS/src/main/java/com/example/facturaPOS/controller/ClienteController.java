package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Cliente;
import com.example.facturaPOS.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/create")
    public String createCliente(@RequestBody Cliente cliente) {
        clienteService.saveCliente(cliente);
        return "Cliente registered successfully!";
    }
}
	