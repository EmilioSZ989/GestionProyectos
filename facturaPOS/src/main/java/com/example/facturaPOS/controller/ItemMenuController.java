package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Menu;
import com.example.facturaPOS.service.ItemMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:8080")
public class ItemMenuController {

    @Autowired
    private ItemMenuService itemMenuService;

    @GetMapping("/all")
    public List<Menu> getAllItems() {
        return itemMenuService.findAll();
    }

    @PostMapping("/create")
    public String createItem(@RequestBody Menu itemMenu) {
        itemMenuService.saveItemMenu(itemMenu);
        return "Item created successfully!";
    }

    @PutMapping("/update")
    public String updateItem(@RequestBody Menu itemMenu) {
        itemMenuService.saveItemMenu(itemMenu);
        return "Item updated successfully!";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable Integer id) {
        itemMenuService.deleteItemMenu(id);
        return "Item deleted successfully!";
    }
}
