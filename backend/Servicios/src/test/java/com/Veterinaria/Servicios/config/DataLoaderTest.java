package com.Veterinaria.Servicios.config;

import com.Veterinaria.Servicios.model.Servicio;
import com.Veterinaria.Servicios.repository.ServicioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DataLoaderTest {

    @Mock
    private ServicioRepository repository;

    @InjectMocks
    private DataLoader dataLoader;

    @Test
    @SuppressWarnings("unchecked")
    void run_conTablaVacia_insertaLosServiciosIniciales() {
        when(repository.count()).thenReturn(0L);
        ArgumentCaptor<List<Servicio>> captor = ArgumentCaptor.forClass(List.class);

        dataLoader.run();

        verify(repository).saveAll(captor.capture());
        List<Servicio> servicios = captor.getValue();
        assertEquals(7, servicios.size());
        assertTrue(servicios.stream().allMatch(s -> s.isActivo() && s.getPrecio() > 0 && s.getIcono() != null));
    }

    @Test
    void run_conDatosExistentes_noDuplicaRegistros() {
        when(repository.count()).thenReturn(7L);

        dataLoader.run();

        verify(repository, never()).saveAll(anyList());
    }
}
