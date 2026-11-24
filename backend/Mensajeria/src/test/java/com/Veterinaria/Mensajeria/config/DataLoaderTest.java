package com.Veterinaria.Mensajeria.config;

import com.Veterinaria.Mensajeria.model.Mensaje;
import com.Veterinaria.Mensajeria.repository.MensajeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DataLoaderTest {

    @Mock
    private MensajeRepository repository;

    @InjectMocks
    private DataLoader dataLoader;

    @Test
    @SuppressWarnings("unchecked")
    void run_conTablaVacia_insertaLosMensajesIniciales() {
        when(repository.count()).thenReturn(0L);
        ArgumentCaptor<List<Mensaje>> captor = ArgumentCaptor.forClass(List.class);

        dataLoader.run();

        verify(repository).saveAll(captor.capture());
        assertEquals(2, captor.getValue().size());
    }

    @Test
    void run_conDatosExistentes_noDuplicaRegistros() {
        when(repository.count()).thenReturn(2L);

        dataLoader.run();

        verify(repository, never()).saveAll(anyList());
    }
}
