package com.example.facturaPOS.model;

import java.math.BigDecimal;

public class PagoRequest {
    private Long idFactura;
    private BigDecimal cantidadRecibida;
    private Long idTipoPago;
	public Long getIdFactura() {
		return idFactura;
	}
	public void setIdFactura(Long idFactura) {
		this.idFactura = idFactura;
	}
	public BigDecimal getCantidadRecibida() {
		return cantidadRecibida;
	}
	public void setCantidadRecibida(BigDecimal cantidadRecibida) {
		this.cantidadRecibida = cantidadRecibida;
	}
	public Long getIdTipoPago() {
		return idTipoPago;
	}
	public void setIdTipoPago(Long idTipoPago) {
		this.idTipoPago = idTipoPago;
	}

    
}
