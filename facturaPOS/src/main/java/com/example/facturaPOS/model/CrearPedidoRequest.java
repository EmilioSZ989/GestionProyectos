package com.example.facturaPOS.model;

import java.util.List;

public class CrearPedidoRequest {
    private Pedido pedido;
    private List<ItemPedido> itemsPedido;

    // Getters y setters
    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public List<ItemPedido> getItemsPedido() {
        return itemsPedido;
    }

    public void setItemsPedido(List<ItemPedido> itemsPedido) {
        this.itemsPedido = itemsPedido;
    }
}
