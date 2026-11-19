package com.Veterinaria.Servicios.repository;

import com.Veterinaria.Servicios.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}