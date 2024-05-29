package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Menu;
import com.example.facturaPOS.service.ItemMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viewMenu")
public class ViewMenuController {

    @Autowired
    private ItemMenuService itemMenuService;

    @GetMapping("/all")
    public List<Menu> getAllItems() {
        return itemMenuService.findAll();
    }
}
