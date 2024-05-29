package com.example.facturaPOS.controller;

import com.example.facturaPOS.model.Usuario;
import com.example.facturaPOS.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        // Buscamos al usuario por su correo electrónico
        Usuario user = usuarioService.findByCorreo(usuario.getCorreo()).orElse(null);

        // Verificamos si el usuario existe y si la contraseña coincide
        if (user != null && user.getContraseña().equals(usuario.getContraseña())) {
            // Obtener el rol del usuario
            String rol = user.getTipoUsuario().getTipoUsuario();
            return ResponseEntity.ok("Login successful! Role: " + rol);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed!");
        }
    }
}
