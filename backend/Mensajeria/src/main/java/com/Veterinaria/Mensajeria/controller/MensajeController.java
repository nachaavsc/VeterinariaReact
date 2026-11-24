package com.Veterinaria.Mensajeria.controller;

import com.Veterinaria.Mensajeria.model.Mensaje;
import com.Veterinaria.Mensajeria.service.MensajeService;
import com.Veterinaria.Mensajeria.security.RequiereRol;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {

    private final MensajeService service;

    public MensajeController(MensajeService service) {
        this.service = service;
    }

    @GetMapping
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public List<Mensaje> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Mensaje> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Mensaje> enviar(@Valid @RequestBody Mensaje mensaje) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.enviar(mensaje));
    }

    @PutMapping("/{id}/leido")
    @RequiereRol("ADMIN")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Mensaje> marcarLeido(@PathVariable Long id) {
        return service.marcarComoLeido(id)
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