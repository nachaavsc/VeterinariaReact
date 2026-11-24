package com.Veterinaria.Mensajeria.config;

import com.Veterinaria.Mensajeria.model.Mensaje;
import com.Veterinaria.Mensajeria.repository.MensajeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final MensajeRepository repository;

    public DataLoader(MensajeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        LocalDateTime ahora = LocalDateTime.now();
        repository.saveAll(List.of(
                new Mensaje(null, "Juan Pérez", "juan@mail.com", "912345678", "Consulta desde el sitio web",
                        "¿Tienen disponibilidad para vacuna antirrábica este sábado?", ahora.minusDays(2), true),
                new Mensaje(null, "María Silva", "maria@mail.com", "987654321", "Consulta desde el sitio web",
                        "Quisiera saber el horario de atención para peluquería felina.", ahora.minusHours(5), false)
        ));
    }
}
