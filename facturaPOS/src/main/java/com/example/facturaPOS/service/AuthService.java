package com.example.facturaPOS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Usuario;
import com.example.facturaPOS.repository.UsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(String correo, String contrasena) {
        Optional<Usuario> usuario = usuarioRepository.customFindByCorreoAndContrasena(correo, contrasena);
        return usuario.orElse(null);
    }

    public boolean validarCredenciales(String correo, String contrasena) {
        return usuarioRepository.customExistsByCorreoAndContrasena(correo, contrasena);
    }
}
