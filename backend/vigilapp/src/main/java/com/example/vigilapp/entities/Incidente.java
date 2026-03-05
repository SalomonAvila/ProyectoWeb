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
@Table(name = "Incidente")
public class Incidente{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha_hora;
    private String descripcion;
    
    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_turno", nullable = false)
    private Long id_turno;

    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zona", nullable = false)
    private Long id_zona;

    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo", nullable = false)
    private Long id_tipo;

    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_severidad", nullable = false)
    private Long id_severidad;

    


}