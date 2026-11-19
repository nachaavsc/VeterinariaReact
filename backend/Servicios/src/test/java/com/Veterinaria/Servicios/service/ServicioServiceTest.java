package com.Veterinaria.Servicios.service;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.repository.ServicioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServicioServiceTest {

    @Mock
    private ServicioRepository repository;

    @InjectMocks
    private ServicioService service;

    private Servicio servicioConsulta;
    private Servicio servicioInactivo;

    @BeforeEach
    void setUp() {
        servicioConsulta = new Servicio(1L, "Consulta General", "Medicina Preventiva", "Evaluación física completa", 25000, true);
        servicioInactivo = new Servicio(2L, "Baño Medicado", "Estética", "Baño dermatológico", 18000, false);
    }

    @Test
    @DisplayName("1. obtenerTodos retorna la lista completa de servicios")
    void obtenerTodos_retornaListaCompleta() {
        when(repository.findAll()).thenReturn(List.of(servicioConsulta, servicioInactivo));

        List<Servicio> resultado = service.obtenerTodos();

        assertEquals(2, resultado.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    @DisplayName("2. obtenerActivos filtra y devuelve solo los servicios activos")
    void obtenerActivos_filtraSoloActivos() {
        when(repository.findAll()).thenReturn(List.of(servicioConsulta, servicioInactivo));

        List<Servicio> activos = service.obtenerActivos();

        assertEquals(1, activos.size());
        assertEquals("Consulta General", activos.get(0).getNombre());
        assertTrue(activos.get(0).isActivo());
    }

    @Test
    @DisplayName("3. obtenerPorId retorna el servicio cuando el ID existe")
    void obtenerPorId_cuandoExiste_retornaServicio() {
        when(repository.findById(1L)).thenReturn(Optional.of(servicioConsulta));

        Optional<Servicio> resultado = service.obtenerPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Consulta General", resultado.get().getNombre());
    }

    @Test
    @DisplayName("4. obtenerPorId retorna Optional vacío cuando el ID no existe")
    void obtenerPorId_cuandoNoExiste_retornaVacio() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        Optional<Servicio> resultado = service.obtenerPorId(99L);

        assertTrue(resultado.isEmpty());
    }

    @Test
    @DisplayName("5. crear guarda correctamente un servicio válido y lo marca activo")
    void crear_conDatosValidos_guardaServicio() {
        Servicio nuevo = new Servicio(null, "Vacuna Óctuple", "Vacunación", "Inmunización anual", 20000, false);
        when(repository.save(any(Servicio.class))).thenAnswer(inv -> {
            Servicio s = inv.getArgument(0);
            s.setId(3L);
            return s;
        });

        Servicio guardado = service.crear(nuevo);

        assertNotNull(guardado.getId());
        assertTrue(guardado.isActivo());
        assertEquals("Vacuna Óctuple", guardado.getNombre());
        verify(repository).save(nuevo);
    }

    @Test
    @DisplayName("6. crear lanza excepción si el nombre está vacío")
    void crear_sinNombre_lanzaExcepcion() {
        Servicio invalido = new Servicio(null, "   ", "Vacunación", "Desc", 15000, true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.crear(invalido));

        assertEquals("El nombre del servicio es obligatorio", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("7. crear lanza excepción si el precio es menor o igual a cero")
    void crear_conPrecioInvalido_lanzaExcepcion() {
        Servicio invalido = new Servicio(null, "Desparasitación", "Prevención", "Desc", 0, true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.crear(invalido));

        assertEquals("El precio del servicio debe ser mayor a 0", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("8. actualizar modifica un servicio existente correctamente")
    void actualizar_cuandoExiste_modificaYGuarda() {
        Servicio datosNuevos = new Servicio(null, "Consulta Especialista", "Especialidad", "Cardiología", 35000, true);
        when(repository.findById(1L)).thenReturn(Optional.of(servicioConsulta));
        when(repository.save(any(Servicio.class))).thenAnswer(inv -> inv.getArgument(0));

        Optional<Servicio> actualizado = service.actualizar(1L, datosNuevos);

        assertTrue(actualizado.isPresent());
        assertEquals("Consulta Especialista", actualizado.get().getNombre());
        assertEquals(35000, actualizado.get().getPrecio());
    }

    @Test
    @DisplayName("9. actualizar lanza excepción si el nuevo precio es negativo")
    void actualizar_conPrecioNegativo_lanzaExcepcion() {
        Servicio datosInvalidos = new Servicio(null, "Consulta", "General", "Desc", -5000, true);

        assertThrows(IllegalArgumentException.class, () -> service.actualizar(1L, datosInvalidos));
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("10. eliminar retorna true cuando el servicio existe y lo elimina")
    void eliminar_cuandoExiste_retornaTrue() {
        when(repository.existsById(1L)).thenReturn(true);

        boolean eliminado = service.eliminar(1L);

        assertTrue(eliminado);
        verify(repository).deleteById(1L);
    }

    @Test
    @DisplayName("11. eliminar retorna false cuando el servicio no existe")
    void eliminar_cuandoNoExiste_retornaFalse() {
        when(repository.existsById(99L)).thenReturn(false);

        boolean eliminado = service.eliminar(99L);

        assertFalse(eliminado);
        verify(repository, never()).deleteById(any());
    }
}
