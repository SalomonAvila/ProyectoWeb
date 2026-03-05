package com.example.vigilapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Zona")
public class Zona {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id_zona;

      private String nombre;
      private String descripcion;
      private String tipo;
      private Boolean activa;
}
