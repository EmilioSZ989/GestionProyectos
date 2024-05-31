package com.example.facturaPOS.model;

import java.util.List;

public class PedidoRequest {
    private Pedido pedido;
    private List<ItemPedido> items;
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}
	public List<ItemPedido> getItems() {
		return items;
	}
	public void setItems(List<ItemPedido> items) {
		this.items = items;
	}

    
}
