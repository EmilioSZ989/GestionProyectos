package com.example.facturaPOS.service;

import com.example.facturaPOS.model.Menu;
import com.example.facturaPOS.repository.CategoriaRepository;
import com.example.facturaPOS.repository.ItemMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ItemMenuService {

    @Autowired
    private ItemMenuRepository itemMenuRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public void saveItemMenu(Menu itemMenu) {
        // Ensure the Categoria is saved first
        if (itemMenu.getCategoria() != null && itemMenu.getCategoria().getIdCategoria() != null) {
            itemMenu.setCategoria(categoriaRepository.findById(itemMenu.getCategoria().getIdCategoria()).orElseThrow(
                () -> new RuntimeException("Categoria not found")));
        }
        itemMenuRepository.save(itemMenu);
    }

    public List<Menu> findAll() {
        return itemMenuRepository.findAll();
    }

    public void deleteItemMenu(Integer id) {
        itemMenuRepository.deleteById(id);
    }
}
