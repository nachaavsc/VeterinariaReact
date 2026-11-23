package com.Veterinaria.Historial.service;

import com.Veterinaria.Historial.model.Atencion;
import com.Veterinaria.Historial.repository.AtencionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AtencionService {

    private final AtencionRepository repository;

    public AtencionService(AtencionRepository repository) {
        this.repository = repository;
    }

    public List<Atencion> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Atencion> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<Atencion> obtenerPorMascota(Long mascotaId) {
        return repository.findByMascotaIdOrderByFechaDesc(mascotaId);
    }

    public Atencion crear(Atencion atencion) {
        validar(atencion);
        atencion.setId(null);
        if (atencion.getFecha() == null) {
            atencion.setFecha(LocalDate.now());
        }
        if (atencion.getEstado() == null || atencion.getEstado().isBlank()) {
            atencion.setEstado("Pendiente");
        }
        return repository.save(atencion);
    }

    public Optional<Atencion> actualizar(Long id, Atencion datos) {
        validar(datos);
        return repository.findById(id).map(actual -> {
            datos.setId(actual.getId());
            return repository.save(datos);
        });
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    private void validar(Atencion atencion) {
        if (atencion.getMascotaId() == null) {
            throw new IllegalArgumentException("La mascota es obligatoria");
        }
        if (atencion.getMotivo() == null || atencion.getMotivo().isBlank()) {
            throw new IllegalArgumentException("El motivo de la atención es obligatorio");
        }
        if (atencion.getVeterinario() == null || atencion.getVeterinario().isBlank()) {
            throw new IllegalArgumentException("El veterinario es obligatorio");
        }
    }
}
