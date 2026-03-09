package com.example.vigilapp.repositories;

import com.example.vigilapp.entities.MetricasDocente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetricasDocenteRepository extends JpaRepository<MetricasDocente, Long> {}