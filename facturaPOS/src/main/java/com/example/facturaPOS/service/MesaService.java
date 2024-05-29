package com.example.facturaPOS.service;

import com.example.facturaPOS.model.Mesa;
import com.example.facturaPOS.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MesaService {

    @Autowired
    private MesaRepository mesaRepository;

    public Mesa saveMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public List<Mesa> findAll() {
        return mesaRepository.findAll();
    }

    public Mesa findById(Integer id) {
        Optional<Mesa> optionalMesa = mesaRepository.findById(id);
        return optionalMesa.orElse(null);
    }

    public void deleteMesa(Integer id) {
        mesaRepository.deleteById(id);
    }
}
