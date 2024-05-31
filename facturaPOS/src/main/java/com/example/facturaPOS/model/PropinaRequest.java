package com.example.facturaPOS.model;

import java.math.BigDecimal;

public class PropinaRequest {
    private Long idPedido;
    private BigDecimal porcentajePropina;
	public Long getIdPedido() {
		return idPedido;
	}
	public void setIdPedido(Long idPedido) {
		this.idPedido = idPedido;
	}
	public BigDecimal getPorcentajePropina() {
		return porcentajePropina;
	}
	public void setPorcentajePropina(BigDecimal porcentajePropina) {
		this.porcentajePropina = porcentajePropina;
	}

    
}
