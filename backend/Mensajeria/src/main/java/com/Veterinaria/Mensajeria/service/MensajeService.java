package com.Veterinaria.Mensajeria.service;

import com.Veterinaria.Mensajeria.model.Mensaje;
import com.Veterinaria.Mensajeria.repository.MensajeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MensajeService {

    private final MensajeRepository repository;

    public MensajeService(MensajeRepository repository) {
        this.repository = repository;
    }

    public List<Mensaje> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Mensaje> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Mensaje enviar(Mensaje mensaje) {
        if (mensaje.getNombreRemitente() == null || mensaje.getNombreRemitente().isBlank()) {
            throw new IllegalArgumentException("El nombre del remitente es obligatorio");
        }
        if (mensaje.getEmail() == null || !mensaje.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Ingrese un correo electrónico válido");
        }
        if (mensaje.getContenido() == null || mensaje.getContenido().isBlank()) {
            throw new IllegalArgumentException("El contenido del mensaje no puede estar vacío");
        }

        mensaje.setId(null);
        mensaje.setFechaEnvio(LocalDateTime.now());
        mensaje.setLeido(false);
        return repository.save(mensaje);
    }

    public Optional<Mensaje> marcarComoLeido(Long id) {
        return repository.findById(id).map(actual -> {
            actual.setLeido(true);
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
}