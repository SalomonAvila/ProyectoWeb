package com.example.vigilapp.entities;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Turno")
public class Turno {    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_turno;

    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private String estado;
    private Integer limpieza_calificacion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_docente", nullable = false)
    private Long id_docente;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zona", nullable = false)
    private Long id_zona;
    

}   
