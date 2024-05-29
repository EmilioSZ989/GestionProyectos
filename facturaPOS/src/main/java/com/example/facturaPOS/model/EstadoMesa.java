package com.example.facturaPOS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "EstadoMesa")
public class EstadoMesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEstadoMesa;

    @Column(nullable = false, length = 19)
    private String estadoMesa;

	public Integer getIdEstadoMesa() {
		return idEstadoMesa;
	}

	public void setIdEstadoMesa(Integer idEstadoMesa) {
		this.idEstadoMesa = idEstadoMesa;
	}

	public String getEstadoMesa() {
		return estadoMesa;
	}

	public void setEstadoMesa(String estadoMesa) {
		this.estadoMesa = estadoMesa;
	}

    
}
