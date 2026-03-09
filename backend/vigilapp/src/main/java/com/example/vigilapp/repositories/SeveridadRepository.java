package com.example.vigilapp.repositories;

import com.example.vigilapp.entities.Severidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeveridadRepository extends JpaRepository<Severidad, Long> {}