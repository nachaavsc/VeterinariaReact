package com.Veterinaria.Equipo.config;

import com.Veterinaria.Equipo.model.Veterinario;
import com.Veterinaria.Equipo.repository.VeterinarioRepository;
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
    private VeterinarioRepository repository;

    @InjectMocks
    private DataLoader dataLoader;

    private static Veterinario conFoto(String nombre, String email) {
        Veterinario veterinario = new Veterinario(null, nombre, "Medicina", "", email, true);
        veterinario.setFoto("/equipo/foto.jpg");
        return veterinario;
    }

    @SuppressWarnings("unchecked")
    private List<Veterinario> capturarGuardados() {
        ArgumentCaptor<List<Veterinario>> captor = ArgumentCaptor.forClass(List.class);
        verify(repository).saveAll(captor.capture());
        return captor.getValue();
    }

    @Test
    void run_conTablaVacia_insertaLosCincoEspecialistasConFoto() {
        when(repository.findAll()).thenReturn(List.of());

        dataLoader.run();

        List<Veterinario> guardados = capturarGuardados();
        assertEquals(5, guardados.size());
        assertTrue(guardados.stream().allMatch(v -> v.getFoto() != null && !v.getFoto().isBlank() && v.getExperiencia() != null));
    }

    @Test
    void run_conRegistrosAntiguosSinFoto_losReemplazaPorLosEspecialistas() {
        List<Veterinario> antiguos = List.of(
                new Veterinario(1L, "Dr. Roberto Gómez", "Medicina General", "", "roberto@sanmarcos.cl", true),
                new Veterinario(2L, "Dra. Camila Rojas", "Cirugía", "", "camila@sanmarcos.cl", true));
        when(repository.findAll()).thenReturn(antiguos);

        dataLoader.run();

        verify(repository).deleteAll(antiguos);
        assertEquals(5, capturarGuardados().size());
    }

    @Test
    void run_conEspecialistasYaCargados_noModificaNada() {
        when(repository.findAll()).thenReturn(List.of(conFoto("Dra. Ana Rodríguez", "ana@sanmarcos.cl")));

        dataLoader.run();

        verify(repository, never()).deleteAll(anyList());
        verify(repository, never()).saveAll(anyList());
    }

    @Test
    void run_conMezclaDeAntiguosYVigentes_soloAgregaLosEspecialistasFaltantes() {
        Veterinario antiguo = new Veterinario(1L, "Dr. Andrés Muñoz", "Dermatología", "", "andres@sanmarcos.cl", true);
        Veterinario vigente = conFoto("Dra. Ana Rodríguez", "ana@sanmarcos.cl");
        when(repository.findAll()).thenReturn(List.of(antiguo, vigente));

        dataLoader.run();

        verify(repository).deleteAll(List.of(antiguo));
        List<Veterinario> guardados = capturarGuardados();
        assertEquals(4, guardados.size());
        assertTrue(guardados.stream().noneMatch(v -> v.getEmail().equals("ana@sanmarcos.cl")));
    }
}
