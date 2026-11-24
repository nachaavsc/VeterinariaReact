package com.Veterinaria.Mascotas.controller;

import com.Veterinaria.Mascotas.model.Mascota;
import com.Veterinaria.Mascotas.security.RequiereRol;
import com.Veterinaria.Mascotas.service.MascotaService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
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
    public ResponseEntity<Mascota> crear(@Valid @RequestBody Mascota mascota) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(mascota));
    }

    @PutMapping("/{id}")
    @RequiereRol
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Mascota> actualizar(@PathVariable Long id, @Valid @RequestBody Mascota datos) {
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
