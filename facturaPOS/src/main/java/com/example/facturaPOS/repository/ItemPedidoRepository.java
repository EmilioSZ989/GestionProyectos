package com.example.facturaPOS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.facturaPOS.model.ItemPedido;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {
	@Transactional
    @Modifying
    @Query("DELETE FROM ItemPedido ip WHERE ip.itemMenu.idItemMenu = :itemMenuId")
    void deleteByItemMenuId(Long itemMenuId);
}