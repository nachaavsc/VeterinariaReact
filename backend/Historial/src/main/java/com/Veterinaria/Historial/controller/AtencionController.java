package com.Veterinaria.Historial.controller;

import com.Veterinaria.Historial.model.Atencion;
import com.Veterinaria.Historial.security.RequiereRol;
import com.Veterinaria.Historial.service.AtencionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "http://localhost:5173")
public class AtencionController {

    private final AtencionService service;

    public AtencionController(AtencionService service) {
        this.service = service;
    }

    @GetMapping
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public List<Atencion> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Atencion> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mascota/{mascotaId}")
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public List<Atencion> listarPorMascota(@PathVariable Long mascotaId) {
        return service.obtenerPorMascota(mascotaId);
    }

    @PostMapping
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> crear(@RequestBody Atencion atencion) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(atencion));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Atencion datos) {
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
