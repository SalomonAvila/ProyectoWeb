package com.example.vigilapp.controllers;

import com.example.vigilapp.entities.Turno;
import com.example.vigilapp.repositories.TurnoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    private final TurnoRepository turnoRepository;

    public TurnoController(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    @GetMapping
    public List<Turno> getAll() { return turnoRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> getById(@PathVariable Long id) {
        return turnoRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Turno create(@RequestBody Turno turno) { return turnoRepository.save(turno); }

    @PutMapping("/{id}")
    public ResponseEntity<Turno> update(@PathVariable Long id, @RequestBody Turno turno) {
        return turnoRepository.findById(id).map(existing -> {
            existing.setFecha(turno.getFecha());
            existing.setHora_inicio(turno.getHora_inicio());
            existing.setHora_fin(turno.getHora_fin());
            existing.setEstado(turno.getEstado());
            existing.setLimpieza_calificacion(turno.getLimpieza_calificacion());
            existing.setDocente(turno.getDocente());
            existing.setZona(turno.getZona());
            return ResponseEntity.ok(turnoRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return turnoRepository.findById(id).map(existing -> {
            turnoRepository.delete(existing);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}