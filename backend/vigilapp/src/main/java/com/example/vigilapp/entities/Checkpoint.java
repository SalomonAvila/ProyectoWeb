package com.example.vigilapp.entities;

import java.util.function.LongFunction;

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
@Table(name = "Checkpoint")
public class Checkpoint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_checkpoint;

    private String nombre; 
    private String codigo_qr;

    @ManyToAny(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zona", nullable = false)
    private Long id_zona;
}
