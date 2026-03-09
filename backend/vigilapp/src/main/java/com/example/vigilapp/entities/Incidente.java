package com.example.vigilapp.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Incidente")
public class Incidente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_incidente;

    private LocalDateTime fecha_hora;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_turno", nullable = false)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "id_zona", nullable = false)
    private Zona zona;

    @ManyToOne
    @JoinColumn(name = "id_tipo", nullable = false)
    private TipoIncidente tipoIncidente;

    @ManyToOne
    @JoinColumn(name = "id_severidad", nullable = false)
    private Severidad severidad;
}