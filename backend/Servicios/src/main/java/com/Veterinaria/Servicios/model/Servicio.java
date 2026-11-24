package com.Veterinaria.Servicios.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "servicios")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del servicio es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String nombre;

    @Size(max = 100, message = "La categoría no puede superar los 100 caracteres")
    private String categoria;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String descripcion;

    @NotNull(message = "El precio del servicio debe ser mayor a 0")
    @Positive(message = "El precio del servicio debe ser mayor a 0")
    private Integer precio;

    @Positive(message = "El precio máximo debe ser mayor a 0")
    private Integer precioMaximo;

    @Size(max = 50, message = "El icono no puede superar los 50 caracteres")
    private String icono;

    @Size(max = 100, message = "La duración no puede superar los 100 caracteres")
    private String duracion;

    @Size(max = 100, message = "La modalidad no puede superar los 100 caracteres")
    private String modalidad;

    @Size(max = 255, message = "El detalle de lo que incluye no puede superar los 255 caracteres")
    private String incluye;

    private boolean activo = true;

    public Servicio() {
    }

    public Servicio(Long id, String nombre, String categoria, String descripcion, Integer precio, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
        this.activo = activo;
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getPrecioMaximo() {
        return precioMaximo;
    }

    public void setPrecioMaximo(Integer precioMaximo) {
        this.precioMaximo = precioMaximo;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public String getIncluye() {
        return incluye;
    }

    public void setIncluye(String incluye) {
        this.incluye = incluye;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
