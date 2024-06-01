package com.example.facturaPOS.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Configuracion;
import com.example.facturaPOS.repository.ConfiguracionRepository;

@Service
public class ConfiguracionService {

    @Autowired
    private ConfiguracionRepository configuracionRepository;

    public BigDecimal modificarIVA(BigDecimal nuevoIVA) {
        Configuracion configuracion = configuracionRepository.findByClave("IVA")
                .orElseThrow(() -> new RuntimeException("Configuración de IVA no encontrada"));
        configuracion.setValor(nuevoIVA.toString());
        configuracionRepository.save(configuracion);
        return nuevoIVA;
    }


    public BigDecimal obtenerIVA() {
        Configuracion configuracion = configuracionRepository.findByClave("IVA")
                .orElseThrow(() -> new RuntimeException("Configuración de IVA no encontrada"));
        return new BigDecimal(configuracion.getValor());
    }

    public void inicializarIVA(BigDecimal iva) {
        if (!configuracionRepository.findByClave("IVA").isPresent()) {
            Configuracion configuracion = new Configuracion();
            configuracion.setClave("IVA");
            configuracion.setValor(iva.toString());
            configuracionRepository.save(configuracion);
        }
    }
}
