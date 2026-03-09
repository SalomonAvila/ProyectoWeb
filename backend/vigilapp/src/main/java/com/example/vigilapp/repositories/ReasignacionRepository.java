package com.example.vigilapp.repositories;

import com.example.vigilapp.entities.Reasignacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReasignacionRepository extends JpaRepository<Reasignacion, Long> {}