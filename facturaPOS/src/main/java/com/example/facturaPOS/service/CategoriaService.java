package com.example.facturaPOS.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.facturaPOS.model.Categoria;
import com.example.facturaPOS.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }

    // Aquí podrían añadirse otros métodos de lógica de negocio relacionados con categorías
}
