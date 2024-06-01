package com.example.facturaPOS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.model.ItemMenu;
import com.example.facturaPOS.service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<ItemMenu>> obtenerTodosLosItems() {
        return ResponseEntity.ok(menuService.obtenerTodosLosItems());
    }

    @PostMapping
    public ResponseEntity<ItemMenu> agregarItemMenu(@RequestBody ItemMenu itemMenu) {
        return ResponseEntity.status(HttpStatus.CREATED).body(menuService.agregarItemMenu(itemMenu));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemMenu> editarItemMenu(@PathVariable Long id, @RequestBody ItemMenu itemMenu) {
        ItemMenu actualizado = menuService.editarItemMenu(id, itemMenu);
        if (actualizado != null) {
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarItemMenu(@PathVariable Long id) {
        menuService.eliminarItemMenu(id);
        return ResponseEntity.noContent().build();
    }
}
