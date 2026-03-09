package com.example.vigilapp.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "CheckinTurno")
public class CheckinTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_checkin;

    private LocalDateTime fecha_hora;

    private String metodo;

    @ManyToOne
    @JoinColumn(name = "id_turno", nullable = false)
    private Turno turno;
}