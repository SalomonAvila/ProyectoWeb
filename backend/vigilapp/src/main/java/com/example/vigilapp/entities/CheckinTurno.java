package com.example.vigilapp.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "CheckinTurno")
public class CheckinTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_checkin;

    private LocalDateTime fehca_hora;
    private String metodo;

    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_turno", nullable = false)
    private Long id_turno;

    
}
