package com.example.facturaPOS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "EstadoMesa")
public class EstadoMesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstadoMesa;

    private String estadoMesa;

	public Long getIdEstadoMesa() {
		return idEstadoMesa;
	}

	public void setIdEstadoMesa(Long idEstadoMesa) {
		this.idEstadoMesa = idEstadoMesa;
	}

	public String getEstadoMesa() {
		return estadoMesa;
	}

	public void setEstadoMesa(String estadoMesa) {
		this.estadoMesa = estadoMesa;
	}

    
}
