package com.example.facturaPOS.service;

import com.example.facturaPOS.model.ItemPedido;
import com.example.facturaPOS.repository.ItemPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    public void saveItemPedido(ItemPedido itemPedido) {
        itemPedidoRepository.save(itemPedido);
    }
}
