package com.Veterinaria.Historial.config;

import com.Veterinaria.Historial.model.Atencion;
import com.Veterinaria.Historial.repository.AtencionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    private final AtencionRepository repository;

    public DataLoader(AtencionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        repository.save(new Atencion(null, 1L, LocalDate.now().minusDays(20), "Control anual y vacunas", "Dra. Ana Rodríguez", "Atendido", "Control anual al día."));
        repository.save(new Atencion(null, 2L, LocalDate.now().minusDays(3), "Vacunación triple felina", "Dra. María Gómez", "Pendiente", "Vacunación pendiente."));
        repository.save(new Atencion(null, 3L, LocalDate.now().minusDays(7), "Otitis externa", "Dra. Lucía Fernández", "En Tratamiento", "Tratamiento de otitis con gotas óticas por 10 días."));
    }
}
