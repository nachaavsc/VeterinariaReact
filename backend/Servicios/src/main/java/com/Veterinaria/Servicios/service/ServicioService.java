package com.Veterinaria.Servicios.service;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService {

    private final ServicioRepository repository;

    public ServicioService(ServicioRepository repository) {
        this.repository = repository;
    }

    public List<Servicio> obtenerTodos() {
        return repository.findAll();
    }

    public List<Servicio> obtenerActivos() {
        return repository.findAll().stream()
                .filter(s -> s != null && s.isActivo())
                .toList();
    }

    public Optional<Servicio> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Servicio crear(Servicio servicio) {
        if (servicio.getNombre() == null || servicio.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del servicio es obligatorio");
        }
        if (servicio.getPrecio() == null || servicio.getPrecio() <= 0) {
            throw new IllegalArgumentException("El precio del servicio debe ser mayor a 0");
        }
        validarRangoPrecio(servicio);
        servicio.setId(null);
        servicio.setActivo(true);
        return repository.save(servicio);
    }

    public Optional<Servicio> actualizar(Long id, Servicio datos) {
        if (datos.getPrecio() != null && datos.getPrecio() <= 0) {
            throw new IllegalArgumentException("El precio del servicio debe ser mayor a 0");
        }
        validarRangoPrecio(datos);
        return repository.findById(id).map(actual -> {
            actual.setNombre(datos.getNombre());
            actual.setCategoria(datos.getCategoria());
            actual.setDescripcion(datos.getDescripcion());
            actual.setPrecio(datos.getPrecio());
            actual.setPrecioMaximo(datos.getPrecioMaximo());
            actual.setIcono(datos.getIcono());
            actual.setDuracion(datos.getDuracion());
            actual.setModalidad(datos.getModalidad());
            actual.setIncluye(datos.getIncluye());
            actual.setActivo(datos.isActivo());
            return repository.save(actual);
        });
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    private void validarRangoPrecio(Servicio servicio) {
        if (servicio.getPrecio() != null && servicio.getPrecioMaximo() != null && servicio.getPrecioMaximo() < servicio.getPrecio()) {
            throw new IllegalArgumentException("El precio máximo no puede ser menor al precio base");
        }
    }
}