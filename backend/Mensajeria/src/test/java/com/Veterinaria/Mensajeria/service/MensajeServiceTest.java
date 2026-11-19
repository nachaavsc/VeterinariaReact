package com.Veterinaria.Mensajeria.service;

import com.Veterinaria.Mensajeria.model.Mensaje;
import com.Veterinaria.Mensajeria.repository.MensajeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MensajeServiceTest {

    @Mock
    private MensajeRepository repository;

    @InjectMocks
    private MensajeService service;

    private Mensaje mensajeValido;

    @BeforeEach
    void setUp() {
        mensajeValido = new Mensaje(
                1L,
                "Juan Pérez",
                "juan@mail.com",
                "+56912345678",
                "Consulta vacuna",
                "¿Tienen disponibilidad para vacuna antirrábica este sábado?",
                LocalDateTime.now(),
                false
        );
    }

    @Test
    @DisplayName("1. obtenerTodos retorna todos los mensajes registrados")
    void obtenerTodos_retornaLista() {
        when(repository.findAll()).thenReturn(List.of(mensajeValido));

        List<Mensaje> resultado = service.obtenerTodos();

        assertEquals(1, resultado.size());
        verify(repository).findAll();
    }

    @Test
    @DisplayName("2. enviar guarda el mensaje con fecha automática y estado no leído")
    void enviar_conDatosValidos_guardaMensaje() {
        Mensaje nuevo = new Mensaje(null, "María Silva", "maria@mail.com", "987654321", "Horario", "Consulta horario", null, true);
        when(repository.save(any(Mensaje.class))).thenAnswer(inv -> {
            Mensaje m = inv.getArgument(0);
            m.setId(2L);
            return m;
        });

        Mensaje guardado = service.enviar(nuevo);

        assertNotNull(guardado.getId());
        assertNotNull(guardado.getFechaEnvio());
        assertFalse(guardado.isLeido());
        verify(repository).save(nuevo);
    }

    @Test
    @DisplayName("3. enviar lanza excepción si el correo electrónico no es válido")
    void enviar_conEmailInvalido_lanzaExcepcion() {
        Mensaje invalido = new Mensaje(null, "Pedro", "correo-sin-arroba", "12345", "Duda", "Texto", null, false);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.enviar(invalido));

        assertEquals("Ingrese un correo electrónico válido", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("4. enviar lanza excepción si el contenido está vacío")
    void enviar_sinContenido_lanzaExcepcion() {
        Mensaje invalido = new Mensaje(null, "Pedro", "pedro@mail.com", "12345", "Duda", "   ", null, false);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.enviar(invalido));

        assertEquals("El contenido del mensaje no puede estar vacío", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("5. marcarComoLeido cambia el estado leido a true")
    void marcarComoLeido_cuandoExiste_actualizaEstado() {
        when(repository.findById(1L)).thenReturn(Optional.of(mensajeValido));
        when(repository.save(any(Mensaje.class))).thenAnswer(inv -> inv.getArgument(0));

        Optional<Mensaje> actualizado = service.marcarComoLeido(1L);

        assertTrue(actualizado.isPresent());
        assertTrue(actualizado.get().isLeido());
    }

    @Test
    @DisplayName("6. eliminar retorna true cuando el mensaje existe")
    void eliminar_cuandoExiste_retornaTrue() {
        when(repository.existsById(1L)).thenReturn(true);

        assertTrue(service.eliminar(1L));
        verify(repository).deleteById(1L);
    }
}