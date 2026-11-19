package com.Veterinaria.Servicios.controller;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.repository.ServicioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicioController {

    private final ServicioRepository repo;

    public ServicioController(ServicioRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Servicio> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerPorId(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Servicio crear(@RequestBody Servicio servicio) {
        return repo.save(servicio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(@PathVariable Long id, @RequestBody Servicio datos) {
        return repo.findById(id).map(actual -> {
            actual.setNombre(datos.getNombre());
            actual.setCategoria(datos.getCategoria());
            actual.setDescripcion(datos.getDescripcion());
            actual.setPrecio(datos.getPrecio());
            actual.setActivo(datos.isActivo());
            return ResponseEntity.ok(repo.save(actual));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}