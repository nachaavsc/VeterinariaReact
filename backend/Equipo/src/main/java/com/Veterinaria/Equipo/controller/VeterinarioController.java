package com.Veterinaria.Equipo.controller;

import com.Veterinaria.Equipo.model.Veterinario;
import com.Veterinaria.Equipo.security.RequiereRol;
import com.Veterinaria.Equipo.service.VeterinarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/equipo")
@CrossOrigin(origins = "http://localhost:5173")
public class VeterinarioController {

    private final VeterinarioService service;

    public VeterinarioController(VeterinarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Veterinario> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veterinario> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> crear(@RequestBody Veterinario veterinario) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(veterinario));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Veterinario datos) {
        try {
            return service.actualizar(id, datos)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!service.eliminar(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
