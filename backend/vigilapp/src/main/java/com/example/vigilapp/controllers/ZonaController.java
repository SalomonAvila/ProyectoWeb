package com.example.vigilapp.controllers;

import com.example.vigilapp.entities.Zona;
import com.example.vigilapp.repositories.ZonaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/zonas")
public class ZonaController {

    private final ZonaRepository zonaRepository;

    public ZonaController(ZonaRepository zonaRepository) {
        this.zonaRepository = zonaRepository;
    }

    @GetMapping
    public List<Zona> getAll() { return zonaRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Zona> getById(@PathVariable Long id) {
        return zonaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Zona create(@RequestBody Zona zona) { return zonaRepository.save(zona); }

    @PutMapping("/{id}")
    public ResponseEntity<Zona> update(@PathVariable Long id, @RequestBody Zona zona) {
        return zonaRepository.findById(id).map(existing -> {
            existing.setNombre(zona.getNombre());
            existing.setDescripcion(zona.getDescripcion());
            existing.setTipo(zona.getTipo());
            existing.setActiva(zona.getActiva());
            return ResponseEntity.ok(zonaRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return zonaRepository.findById(id).map(existing -> {
            zonaRepository.delete(existing);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}