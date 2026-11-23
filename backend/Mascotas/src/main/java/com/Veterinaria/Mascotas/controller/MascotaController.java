package com.Veterinaria.Mascotas.controller;

import com.Veterinaria.Mascotas.model.Mascota;
import com.Veterinaria.Mascotas.security.RequiereRol;
import com.Veterinaria.Mascotas.service.MascotaService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:5173")
public class MascotaController {

    private final MascotaService service;

    public MascotaController(MascotaService service) {
        this.service = service;
    }

    @GetMapping
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public List<Mascota> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Mascota> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> crear(@RequestBody Mascota mascota) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(mascota));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Mascota datos) {
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
