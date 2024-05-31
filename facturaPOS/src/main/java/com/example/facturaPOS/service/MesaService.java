package com.example.facturaPOS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Mesa;
import com.example.facturaPOS.repository.MesaRepository;

@Service
public class MesaService {

    @Autowired
    private MesaRepository mesaRepository;

    public List<Mesa> obtenerTodasLasMesas() {
        return mesaRepository.findAll();
    }

    public Mesa crearMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public Mesa editarMesa(Long id, Mesa mesa) {
        Optional<Mesa> mesaOptional = mesaRepository.findById(id);
        if (mesaOptional.isPresent()) {
            Mesa mesaExistente = mesaOptional.get();
            mesaExistente.setEstadoMesa(mesa.getEstadoMesa());
            return mesaRepository.save(mesaExistente);
        } else {
            return null;
        }
    }

    public void eliminarMesa(Long id) {
        mesaRepository.deleteById(id);
    }
}
