package com.example.vigilapp.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Turno")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_turno;

    private LocalDate fecha;

    private LocalTime hora_inicio;

    private LocalTime hora_fin;

    private String estado;

    private Integer limpieza_calificacion;

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private Usuario docente;

    @ManyToOne
    @JoinColumn(name = "id_zona", nullable = false)
    private Zona zona;
}