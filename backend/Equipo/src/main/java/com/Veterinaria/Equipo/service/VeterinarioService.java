package com.Veterinaria.Equipo.service;

import com.Veterinaria.Equipo.model.Veterinario;
import com.Veterinaria.Equipo.repository.VeterinarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeterinarioService {

    private final VeterinarioRepository repository;

    public VeterinarioService(VeterinarioRepository repository) {
        this.repository = repository;
    }

    public List<Veterinario> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Veterinario> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Veterinario crear(Veterinario veterinario) {
        validar(veterinario);
        veterinario.setId(null);
        return repository.save(veterinario);
    }

    public Optional<Veterinario> actualizar(Long id, Veterinario datos) {
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

    private void validar(Veterinario veterinario) {
        if (veterinario.getNombre() == null || veterinario.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (veterinario.getEspecialidad() == null || veterinario.getEspecialidad().isBlank()) {
            throw new IllegalArgumentException("La especialidad es obligatoria");
        }
    }
}
