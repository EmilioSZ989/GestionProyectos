package com.example.facturaPOS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "EstadoPedido")
public class EstadoPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEstadoPedido;

    @Column(nullable = false, length = 19)
    private String estadoPedido;

	public Integer getIdEstadoPedido() {
		return idEstadoPedido;
	}

	public void setIdEstadoPedido(Integer idEstadoPedido) {
		this.idEstadoPedido = idEstadoPedido;
	}

	public String getEstadoPedido() {
		return estadoPedido;
	}

	public void setEstadoPedido(String estadoPedido) {
		this.estadoPedido = estadoPedido;
	}

    
}
