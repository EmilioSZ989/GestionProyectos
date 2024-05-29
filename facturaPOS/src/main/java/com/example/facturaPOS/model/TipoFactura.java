package com.example.facturaPOS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "TipoFactura")
public class TipoFactura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTipoFactura;

    @Column(nullable = false, length = 29)
    private String tipo;
    
    

	public Integer getIdTipoFactura() {
		return idTipoFactura;
	}

	public void setIdTipoFactura(Integer idTipoFactura) {
		this.idTipoFactura = idTipoFactura;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

    
}
