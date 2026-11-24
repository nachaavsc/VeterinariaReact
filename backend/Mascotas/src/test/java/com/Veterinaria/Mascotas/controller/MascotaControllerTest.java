package com.Veterinaria.Mascotas.controller;

import com.Veterinaria.Mascotas.model.Mascota;
import com.Veterinaria.Mascotas.repository.MascotaRepository;
import com.Veterinaria.Mascotas.security.JwtInterceptor;
import com.Veterinaria.Mascotas.security.JwtService;
import com.Veterinaria.Mascotas.service.MascotaService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MascotaController.class)
@Import({JwtInterceptor.class, JwtService.class, MascotaService.class})
class MascotaControllerTest {

    private static final String MASCOTA_VALIDA = """
            {"nombre":"Rocky","especie":"Perro","raza":"Pug","dueno":"Ana López","emailDueno":"ana@mail.com","estado":"Pendiente","descripcion":""}
            """;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MascotaRepository repository;

    @Value("${jwt.secret}")
    private String secreto;

    private String token(String rol) {
        return "Bearer " + Jwts.builder()
                .subject("usuario@mail.com")
                .claim("rol", rol)
                .expiration(new Date(System.currentTimeMillis() + 60_000))
                .signWith(Keys.hmacShaKeyFor(secreto.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    @Test
    void crear_sinToken_responde401() throws Exception {
        mockMvc.perform(post("/api/mascotas").contentType(MediaType.APPLICATION_JSON).content(MASCOTA_VALIDA))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Token JWT requerido"));
        verify(repository, never()).save(any());
    }

    @Test
    void crear_conTokenDeCliente_guardaLaMascota() throws Exception {
        when(repository.save(any(Mascota.class))).thenAnswer(inv -> {
            Mascota mascota = inv.getArgument(0);
            mascota.setId(10L);
            return mascota;
        });

        mockMvc.perform(post("/api/mascotas")
                        .header("Authorization", token("CLIENTE"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(MASCOTA_VALIDA))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.nombre").value("Rocky"));
    }

    @Test
    void crear_conDatosInvalidos_responde400ConMensajeLegible() throws Exception {
        mockMvc.perform(post("/api/mascotas")
                        .header("Authorization", token("CLIENTE"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nombre":"Rocky","especie":"Perro","raza":"Pug","dueno":"Ana López","emailDueno":"correo-invalido"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Ingrese un correo electrónico válido"))
                .andExpect(jsonPath("$.campos.emailDueno").value("Ingrese un correo electrónico válido"));
        verify(repository, never()).save(any());
    }

    @Test
    void crear_conJsonMalformado_responde400() throws Exception {
        mockMvc.perform(post("/api/mascotas")
                        .header("Authorization", token("CLIENTE"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{nombre"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("El formato de los datos enviados no es válido"));
    }

    @Test
    void crear_conTokenFirmadoConOtraClave_responde401() throws Exception {
        String ajeno = "Bearer " + Jwts.builder()
                .subject("intruso@mail.com")
                .claim("rol", "ADMIN")
                .signWith(Keys.hmacShaKeyFor("OtraClaveSecretaQueNoEsLaDelSistema2026".getBytes(StandardCharsets.UTF_8)))
                .compact();

        mockMvc.perform(post("/api/mascotas").header("Authorization", ajeno).contentType(MediaType.APPLICATION_JSON).content(MASCOTA_VALIDA))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Token JWT inválido o expirado"));
    }

    @Test
    void eliminar_conTokenDeCliente_responde403() throws Exception {
        mockMvc.perform(delete("/api/mascotas/1").header("Authorization", token("CLIENTE")))
                .andExpect(status().isForbidden());
        verify(repository, never()).deleteById(any());
    }

    @Test
    void eliminar_conTokenDeAdmin_responde204() throws Exception {
        when(repository.existsById(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/mascotas/1").header("Authorization", token("ADMIN")))
                .andExpect(status().isNoContent());
        verify(repository).deleteById(1L);
    }

    @Test
    void preflightCors_desdeCualquierPuertoLocal_estaPermitido() throws Exception {
        mockMvc.perform(options("/api/mascotas")
                        .header("Origin", "http://localhost:5174")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Access-Control-Request-Headers", "authorization,content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5174"));
    }
}
