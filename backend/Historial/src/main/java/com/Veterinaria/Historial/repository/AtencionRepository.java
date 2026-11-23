package com.Veterinaria.Historial.repository;

import com.Veterinaria.Historial.model.Atencion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AtencionRepository extends JpaRepository<Atencion, Long> {
    List<Atencion> findByMascotaIdOrderByFechaDesc(Long mascotaId);
}
