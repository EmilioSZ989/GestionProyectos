package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	@Query("SELECT u FROM Usuario u WHERE u.correo = ?1 AND u.contrasena = ?2")
	Optional<Usuario> customFindByCorreoAndContrasena(String correo, String contrasena);

	@Query("SELECT COUNT(u) > 0 FROM Usuario u WHERE u.correo = ?1 AND u.contrasena = ?2")
	boolean customExistsByCorreoAndContrasena(String correo, String contrasena);

}
