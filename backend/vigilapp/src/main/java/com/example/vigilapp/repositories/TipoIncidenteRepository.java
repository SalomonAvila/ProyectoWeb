package com.example.vigilapp.repositories;

import com.example.vigilapp.entities.TipoIncidente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoIncidenteRepository extends JpaRepository<TipoIncidente, Long> {}