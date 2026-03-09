package com.example.vigilapp.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Reasignacion")
public class Reasignacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reasignacion;

    private String motivo;

    private LocalDateTime fecha_propuesta;

    private LocalDateTime fecha_respuesta;

    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_turno", nullable = false)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "id_docente_original", nullable = false)
    private Usuario docenteOriginal;

    @ManyToOne
    @JoinColumn(name = "id_docente_propuesto", nullable = false)
    private Usuario docentePropuesto;
}