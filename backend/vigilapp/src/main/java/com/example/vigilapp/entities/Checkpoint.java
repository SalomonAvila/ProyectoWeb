package com.example.vigilapp.entities;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "id_zona", nullable = false)
    private Zona zona;
}