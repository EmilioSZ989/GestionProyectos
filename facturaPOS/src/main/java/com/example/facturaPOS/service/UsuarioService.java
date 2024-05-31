package com.example.facturaPOS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.Usuario;
import com.example.facturaPOS.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario editarUsuario(int idUsuario, Usuario updatedUsuario) {
        return usuarioRepository.findById(Long.valueOf(idUsuario)).map(usuario -> {
            usuario.setNombreUsuario(updatedUsuario.getNombreUsuario());
            usuario.setApellidoUsuario(updatedUsuario.getApellidoUsuario());
            usuario.setCorreo(updatedUsuario.getCorreo());
            usuario.setContrasena(updatedUsuario.getContrasena());
            usuario.setTipoUsuario(updatedUsuario.getTipoUsuario());
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }

    public void eliminarUsuario(int idUsuario) {
        usuarioRepository.deleteById(Long.valueOf(idUsuario));
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }
}
