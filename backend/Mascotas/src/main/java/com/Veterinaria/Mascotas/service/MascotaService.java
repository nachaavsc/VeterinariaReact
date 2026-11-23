package com.Veterinaria.Mascotas.service;

import com.Veterinaria.Mascotas.model.Mascota;
import com.Veterinaria.Mascotas.repository.MascotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {

    private final MascotaRepository repository;

    public MascotaService(MascotaRepository repository) {
        this.repository = repository;
    }

    public List<Mascota> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Mascota> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Mascota crear(Mascota mascota) {
        validar(mascota);
        mascota.setId(null);
        if (mascota.getEstado() == null || mascota.getEstado().isBlank()) {
            mascota.setEstado("Pendiente");
        }
        if (mascota.getEspecie() == null || mascota.getEspecie().isBlank()) {
            mascota.setEspecie("Perro");
        }
        return repository.save(mascota);
    }

    public Optional<Mascota> actualizar(Long id, Mascota datos) {
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

    private void validar(Mascota mascota) {
        if (mascota.getNombre() == null || mascota.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (mascota.getRaza() == null || mascota.getRaza().isBlank()) {
            throw new IllegalArgumentException("La raza es obligatoria");
        }
        if (mascota.getDueno() == null || mascota.getDueno().isBlank()) {
            throw new IllegalArgumentException("El nombre del dueño es obligatorio");
        }
        if (mascota.getEmailDueno() == null || !mascota.getEmailDueno().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Ingrese un correo electrónico válido");
        }
    }
}
