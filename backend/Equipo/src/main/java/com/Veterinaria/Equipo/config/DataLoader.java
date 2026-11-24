package com.Veterinaria.Equipo.config;

import com.Veterinaria.Equipo.model.Veterinario;
import com.Veterinaria.Equipo.repository.VeterinarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DataLoader implements CommandLineRunner {

    private final VeterinarioRepository repository;

    public DataLoader(VeterinarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        List<Veterinario> actuales = repository.findAll();
        List<Veterinario> sinFoto = actuales.stream()
                .filter(v -> v.getFoto() == null || v.getFoto().isBlank())
                .toList();
        if (!actuales.isEmpty() && sinFoto.isEmpty()) {
            return;
        }
        repository.deleteAll(sinFoto);
        Set<String> correosVigentes = actuales.stream()
                .filter(v -> !sinFoto.contains(v))
                .map(Veterinario::getEmail)
                .collect(Collectors.toSet());
        repository.saveAll(especialistas().stream()
                .filter(v -> !correosVigentes.contains(v.getEmail()))
                .toList());
    }

    private List<Veterinario> especialistas() {
        return List.of(
                veterinario("Dra. Ana Rodríguez", "Medicina Interna", "ana@sanmarcos.cl", "/equipo/especialistaAna.jpg", "12 años de experiencia",
                        "Se toma el tiempo de explicar cada diagnóstico con calma. Acompaña a pacientes con enfermedades crónicas y a sus familias en cada control."),
                veterinario("Dr. Carlos Muñoz", "Cirugía y Tejidos Blandos", "carlos@sanmarcos.cl", "/equipo/especialistaCarlos.jpg", "10 años de experiencia",
                        "Planifica cada intervención junto al tutor y hace seguimiento personal del post-operatorio hasta el alta definitiva."),
                veterinario("Dr. Felipe Torres", "Diagnóstico por Imagen", "felipe@sanmarcos.cl", "/equipo/especialistaFelipe.png", "8 años de experiencia",
                        "Realiza radiografías y ecografías con un manejo tranquilo y respetuoso, para que cada examen sea lo menos estresante posible."),
                veterinario("Dra. Lucía Fernández", "Dermatología", "lucia@sanmarcos.cl", "/equipo/especialistaLucia.jpg", "7 años de experiencia",
                        "Busca la causa de alergias y problemas de piel con tratamientos simples de seguir en casa y controles cercanos."),
                veterinario("Dra. María Gómez", "Medicina Felina", "maria@sanmarcos.cl", "/equipo/especialistaMaria.webp", "9 años de experiencia",
                        "Atiende gatos en un ambiente silencioso y sin prisas, adaptando cada consulta a su ritmo y temperamento.")
        );
    }

    private Veterinario veterinario(String nombre, String especialidad, String email, String foto, String experiencia, String descripcion) {
        Veterinario veterinario = new Veterinario(null, nombre, especialidad, descripcion, email, true);
        veterinario.setFoto(foto);
        veterinario.setExperiencia(experiencia);
        return veterinario;
    }
}
