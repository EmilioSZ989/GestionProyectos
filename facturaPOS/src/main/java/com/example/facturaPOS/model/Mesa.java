package com.example.facturaPOS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Mesa")
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMesa;

    @ManyToOne
    @JoinColumn(name = "id_estado_mesa", nullable = false)
    private EstadoMesa estadoMesa;

    public Integer getIdMesa() {
        return idMesa;
    }

    public void setIdMesa(Integer idMesa) {
        this.idMesa = idMesa;
    }

    public EstadoMesa getEstadoMesa() {
        return estadoMesa;
    }

    public void setEstadoMesa(EstadoMesa estadoMesa) {
        this.estadoMesa = estadoMesa;
    }
}
