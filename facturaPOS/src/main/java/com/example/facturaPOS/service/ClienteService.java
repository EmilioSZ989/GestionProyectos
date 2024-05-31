package com.example.facturaPOS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Cliente;
import com.example.facturaPOS.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente registrarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.findAll();
    }

    public Cliente editarCliente(Long id, Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findById(id).orElse(null);
        if (clienteExistente != null) {
            cliente.setIdCliente(id);
            return clienteRepository.save(cliente);
        }
        return null;
    }

    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
