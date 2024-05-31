package com.example.facturaPOS.service;

import com.example.facturaPOS.model.ItemMenu;
import com.example.facturaPOS.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<ItemMenu> obtenerTodosLosItems() {
        return menuRepository.findAll();
    }

    public ItemMenu agregarItemMenu(ItemMenu itemMenu) {
        return menuRepository.save(itemMenu);
    }

    public ItemMenu editarItemMenu(Long id, ItemMenu itemMenu) {
        // Verificar si el item a editar existe en la base de datos
        Optional<ItemMenu> existingItemMenuOptional = menuRepository.findById(id);
        if (existingItemMenuOptional.isEmpty()) {
            throw new NoSuchElementException("No se encontró ningún ItemMenu con el ID: " + id);
        }
        
        // Obtener el itemMenu existente
        ItemMenu existingItemMenu = existingItemMenuOptional.get();
        
        // Actualizar los campos del itemMenu existente con los valores proporcionados
        existingItemMenu.setNombreItem(itemMenu.getNombreItem());
        existingItemMenu.setDescripcion(itemMenu.getDescripcion());
        existingItemMenu.setPrecio(itemMenu.getPrecio());
        // Actualizar la categoría si se proporciona en el objeto itemMenu
        if (itemMenu.getCategoria() != null) {
            existingItemMenu.setCategoria(itemMenu.getCategoria());
        }

        // Guardar los cambios en la base de datos
        return menuRepository.save(existingItemMenu);
    }


    public void eliminarItemMenu(Long id) {
        menuRepository.deleteById(id);
    }
}
