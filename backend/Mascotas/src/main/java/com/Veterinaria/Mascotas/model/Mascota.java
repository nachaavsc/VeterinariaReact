package com.Veterinaria.Mascotas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String nombre;

    @Size(max = 50, message = "La especie no puede superar los 50 caracteres")
    private String especie;

    @NotBlank(message = "La raza es obligatoria")
    @Size(max = 100, message = "La raza no puede superar los 100 caracteres")
    private String raza;

    @NotBlank(message = "El nombre del dueño es obligatorio")
    @Size(max = 100, message = "El nombre del dueño no puede superar los 100 caracteres")
    private String dueno;

    @NotBlank(message = "El email del dueño es obligatorio")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Ingrese un correo electrónico válido")
    private String emailDueno;

    @Pattern(regexp = "^(|Atendido|Pendiente|En Tratamiento)$", message = "El estado debe ser Atendido, Pendiente o En Tratamiento")
    private String estado;

    @Column(length = 500)
    @Size(max = 500, message = "La descripción no puede superar los 500 caracteres")
    private String descripcion;

    @Column(length = 500)
    @Size(max = 500, message = "La URL de la imagen no puede superar los 500 caracteres")
    private String imagen;

    public Mascota() {
    }

    public Mascota(Long id, String nombre, String especie, String raza, String dueno, String emailDueno, String estado, String descripcion, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.dueno = dueno;
        this.emailDueno = emailDueno;
        this.estado = estado;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public String getDueno() {
        return dueno;
    }

    public void setDueno(String dueno) {
        this.dueno = dueno;
    }

    public String getEmailDueno() {
        return emailDueno;
    }

    public void setEmailDueno(String emailDueno) {
        this.emailDueno = emailDueno;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
