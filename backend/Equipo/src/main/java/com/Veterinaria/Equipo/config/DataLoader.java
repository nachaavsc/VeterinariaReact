package com.Veterinaria.Equipo.config;

import com.Veterinaria.Equipo.model.Veterinario;
import com.Veterinaria.Equipo.repository.VeterinarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final VeterinarioRepository repository;

    public DataLoader(VeterinarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        repository.save(new Veterinario(null, "Dr. Roberto Gómez", "Medicina General", "Atención integral de perros y gatos.", "roberto@sanmarcos.cl", true));
        repository.save(new Veterinario(null, "Dra. Camila Rojas", "Cirugía", "Cirugías de tejidos blandos y traumatología.", "camila@sanmarcos.cl", true));
        repository.save(new Veterinario(null, "Dr. Andrés Muñoz", "Dermatología", "Tratamiento de alergias y enfermedades de la piel.", "andres@sanmarcos.cl", true));
    }
}
