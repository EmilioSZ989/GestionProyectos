package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("SELECT c FROM Cliente c WHERE c.nombreCliente LIKE %?1% OR c.apellidoCliente LIKE %?2%")
    List<Cliente> findByNombreClienteContainingOrApellidoClienteContaining(String nombre, String apellido);
}
