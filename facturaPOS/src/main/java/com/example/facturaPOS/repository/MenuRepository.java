package com.example.facturaPOS.repository;


import com.example.facturaPOS.model.ItemMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<ItemMenu, Long> {
    // Aquí puedes agregar métodos personalizados de ser necesario
}
