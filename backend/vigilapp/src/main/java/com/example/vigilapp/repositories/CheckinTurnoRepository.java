package com.example.vigilapp.repositories;

import com.example.vigilapp.entities.CheckinTurno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckinTurnoRepository extends JpaRepository<CheckinTurno, Long> {}