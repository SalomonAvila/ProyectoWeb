package com.example.vigilapp.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "MetricasDocente")
public class MetricasDocente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_metrica;

    private String periodo;

    private Double puntualidad_porcentaje;

    private Double recorridos_promedio;

    private Integer incidentes_reportados;

    private Integer puntos_totales;

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private Usuario docente;
}