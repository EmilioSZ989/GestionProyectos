package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Usuario;
import com.example.facturaPOS.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:8080")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/all")
    public List<Usuario> getAllUsers() {
        return usuarioService.findAll();
    }

    @PostMapping("/create")
    public String createUser(@RequestBody Usuario usuario) {
        usuarioService.saveUsuario(usuario);
        return "User created successfully!";
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody Usuario usuario) {
        usuarioService.saveUsuario(usuario);
        return "User updated successfully!";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
        usuarioService.deleteUsuario(id);
        return "User deleted successfully!";
    }
}
