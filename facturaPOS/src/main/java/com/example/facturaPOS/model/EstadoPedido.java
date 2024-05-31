package com.example.facturaPOS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "EstadoPedido")
public class EstadoPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstadoPedido;

    private String estadoPedido;

	public Long getIdEstadoPedido() {
		return idEstadoPedido;
	}

	public void setIdEstadoPedido(Long idEstadoPedido) {
		this.idEstadoPedido = idEstadoPedido;
	}

	public String getEstadoPedido() {
		return estadoPedido;
	}

	public void setEstadoPedido(String estadoPedido) {
		this.estadoPedido = estadoPedido;
	}

    
}
