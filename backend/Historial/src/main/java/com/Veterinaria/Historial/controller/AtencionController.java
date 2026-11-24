package com.Veterinaria.Historial.controller;

import com.Veterinaria.Historial.model.Atencion;
import com.Veterinaria.Historial.security.RequiereRol;
import com.Veterinaria.Historial.service.AtencionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial")
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
    public ResponseEntity<Atencion> crear(@Valid @RequestBody Atencion atencion) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(atencion));
    }

    @PutMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Atencion> actualizar(@PathVariable Long id, @Valid @RequestBody Atencion datos) {
        return service.actualizar(id, datos)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
