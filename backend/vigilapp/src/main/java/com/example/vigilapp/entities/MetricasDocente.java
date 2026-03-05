package com.example.vigilapp.entities;

import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
public class MetricasDocente{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_metrica;

    private String periodo;
    private Double puntualidad_porcentaje;
    private Double recorridos_promedio;
    private Integer incidentes_reportados;
    private Integer puntos_totales;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_docente", nullable = false)
    private Long id_docente;

}
