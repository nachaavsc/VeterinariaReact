package com.Veterinaria.Historial.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "atenciones")
public class Atencion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La mascota es obligatoria")
    @Positive(message = "La mascota no es válida")
    private Long mascotaId;

    private LocalDate fecha;

    @NotBlank(message = "El motivo de la atención es obligatorio")
    @Size(max = 255, message = "El motivo no puede superar los 255 caracteres")
    private String motivo;

    @NotBlank(message = "El veterinario es obligatorio")
    @Size(max = 100, message = "El veterinario no puede superar los 100 caracteres")
    private String veterinario;

    @Pattern(regexp = "^(|Atendido|Pendiente|En Tratamiento)$", message = "El estado debe ser Atendido, Pendiente o En Tratamiento")
    private String estado;

    @Column(length = 1000)
    @Size(max = 1000, message = "Las observaciones no pueden superar los 1000 caracteres")
    private String observaciones;

    public Atencion() {
    }

    public Atencion(Long id, Long mascotaId, LocalDate fecha, String motivo, String veterinario, String estado, String observaciones) {
        this.id = id;
        this.mascotaId = mascotaId;
        this.fecha = fecha;
        this.motivo = motivo;
        this.veterinario = veterinario;
        this.estado = estado;
        this.observaciones = observaciones;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMascotaId() {
        return mascotaId;
    }

    public void setMascotaId(Long mascotaId) {
        this.mascotaId = mascotaId;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getVeterinario() {
        return veterinario;
    }

    public void setVeterinario(String veterinario) {
        this.veterinario = veterinario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
