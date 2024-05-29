package com.example.facturaPOS.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/config")
public class ConfigController {

    private Float currentIVA = 0.16f; // Initial value of IVA

    @GetMapping("/getIVA")
    public Float getIVA() {
        return currentIVA;
    }

    @PostMapping("/updateIVA")
    public String updateIVA(@RequestParam Float newIVA) {
        if (newIVA < 0) {
            return "IVA must be a positive value.";
        }
        currentIVA = newIVA;
        return "IVA updated successfully!";
    }
}
