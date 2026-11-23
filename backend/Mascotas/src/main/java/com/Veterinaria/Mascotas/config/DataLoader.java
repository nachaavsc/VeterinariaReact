package com.Veterinaria.Mascotas.config;

import com.Veterinaria.Mascotas.model.Mascota;
import com.Veterinaria.Mascotas.repository.MascotaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final MascotaRepository repository;

    public DataLoader(MascotaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        repository.save(new Mascota(null, "Max", "Perro", "Golden Retriever", "Juan Pérez", "juan@mail.com", "Atendido", "Control anual al día.", "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200"));
        repository.save(new Mascota(null, "Luna", "Gato", "Siamés", "María Silva", "maria@mail.com", "Pendiente", "Vacunación pendiente.", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200"));
        repository.save(new Mascota(null, "Thor", "Perro", "Bulldog", "Carlos Soto", "carlos@mail.com", "En Tratamiento", "Tratamiento de otitis.", "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200"));
    }
}
