package com.Veterinaria.Servicios.controller;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.service.ServicioService;
import com.Veterinaria.Servicios.security.RequiereRol;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicioController {

    private final ServicioService service;

    public ServicioController(ServicioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Servicio> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/activos")
    public List<Servicio> listarActivos() {
        return service.obtenerActivos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> crear(@RequestBody Servicio servicio) {
        try {
            return ResponseEntity.ok(service.crear(servicio));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Servicio datos) {
        try {
            return service.actualizar(id, datos)
                    .map(ResponseEntity::ok)
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