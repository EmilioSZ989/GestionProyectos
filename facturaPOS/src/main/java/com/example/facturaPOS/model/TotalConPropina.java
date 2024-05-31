package com.example.facturaPOS.model;

import java.math.BigDecimal;

public class TotalConPropina {
    private BigDecimal totalPedido;
    private BigDecimal propina;
	public BigDecimal getTotalPedido() {
		return totalPedido;
	}
	public void setTotalPedido(BigDecimal totalPedido) {
		this.totalPedido = totalPedido;
	}
	public BigDecimal getPropina() {
		return propina;
	}
	public void setPropina(BigDecimal propina) {
		this.propina = propina;
	}

    
}