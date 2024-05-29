package com.example.facturaPOS.repository;

import com.example.facturaPOS.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {

    @Query("SELECT f FROM Factura f WHERE f.idFactura = :id_factura")
    Factura generateSalesReportByInvoiceNumber(@Param("id_factura") int idFactura);

    @Query("SELECT f FROM Factura f WHERE f.pedido.cliente.idCliente = :id_cliente")
    List<Factura> findVentasPorCliente(@Param("id_cliente") int idCliente);

    @Query("SELECT f FROM Factura f WHERE DATE(f.fechaEmision) = :fecha")
    List<Factura> findVentasDelDia(@Param("fecha") Date fecha);

    @Query("SELECT f FROM Factura f WHERE EXTRACT(MONTH FROM f.fechaEmision) = :mes")
    List<Factura> findVentasPorMes(@Param("mes") int mes);
}
