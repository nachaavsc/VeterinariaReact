package com.Veterinaria.Servicios.config;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.repository.ServicioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ServicioRepository repository;

    public DataLoader(ServicioRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        repository.saveAll(List.of(
                servicio("Consulta General", "Medicina General", "Chequeo clínico completo, evaluación del estado de salud y orientación sobre cuidados preventivos para tu mascota.",
                        "bi-clipboard2-pulse", "30 a 40 minutos", "Presencial con hora agendada", "Examen físico y plan de cuidados", 15000, 20000),
                servicio("Vacunación", "Prevención", "Plan de vacunación al día según especie, edad y factores de riesgo, con cartilla de control incluida.",
                        "bi-shield-plus", "15 a 20 minutos", "Presencial, con o sin hora", "Revisión previa y registro en cartilla", 12000, 18000),
                servicio("Cirugía", "Cirugía", "Procedimientos quirúrgicos con equipo especializado, anestesia monitoreada y seguimiento post-operatorio.",
                        "bi-bandaid", "Según procedimiento", "Programada tras evaluación previa", "Exámenes pre-quirúrgicos y control post-operatorio", 80000, null),
                servicio("Odontología", "Odontología", "Limpieza dental, destartraje y tratamiento de enfermedades bucales para prevenir infecciones y dolor.",
                        "bi-stars", "1 a 2 horas", "Ambulatoria con sedación", "Destartraje, pulido y evaluación bucal", 35000, 60000),
                servicio("Imagenología / Rayos X", "Diagnóstico", "Radiografías y ecografías para un diagnóstico preciso de fracturas, órganos internos y gestaciones.",
                        "bi-display", "20 a 45 minutos", "Con orden médica o derivación", "Informe del especialista", 25000, 45000),
                servicio("Urgencias 24/7", "Urgencias", "Atención inmediata ante accidentes, intoxicaciones o descompensaciones, todos los días del año.",
                        "bi-hospital", "Atención inmediata", "Sin hora previa, todos los días", "Evaluación de triage y estabilización", 30000, null),
                servicio("Peluquería", "Estética", "Baño, corte y cuidado estético adaptado a cada raza, con productos hipoalergénicos.",
                        "bi-scissors", "1 a 3 horas", "Con hora agendada", "Baño, secado, corte y limpieza de oídos", 10000, 22000)
        ));
    }

    private Servicio servicio(String nombre, String categoria, String descripcion, String icono, String duracion,
                              String modalidad, String incluye, Integer precio, Integer precioMaximo) {
        Servicio servicio = new Servicio(null, nombre, categoria, descripcion, precio, true);
        servicio.setIcono(icono);
        servicio.setDuracion(duracion);
        servicio.setModalidad(modalidad);
        servicio.setIncluye(incluye);
        servicio.setPrecioMaximo(precioMaximo);
        return servicio;
    }
}
