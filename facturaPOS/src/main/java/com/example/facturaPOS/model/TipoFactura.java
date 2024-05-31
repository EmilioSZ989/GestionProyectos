package com.example.facturaPOS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TipoFactura")
public class TipoFactura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoFactura;

    private String tipo;

	public Long getIdTipoFactura() {
		return idTipoFactura;
	}

	public void setIdTipoFactura(Long idTipoFactura) {
		this.idTipoFactura = idTipoFactura;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

    
}
