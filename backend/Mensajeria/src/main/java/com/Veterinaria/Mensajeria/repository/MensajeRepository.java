package com.Veterinaria.Mensajeria.repository;

import com.Veterinaria.Mensajeria.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
}