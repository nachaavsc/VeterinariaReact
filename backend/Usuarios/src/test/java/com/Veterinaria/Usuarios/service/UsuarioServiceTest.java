package com.Veterinaria.Usuarios.service;

import com.Veterinaria.Usuarios.dto.AuthResponse;
import com.Veterinaria.Usuarios.dto.LoginRequest;
import com.Veterinaria.Usuarios.dto.RegistroRequest;
import com.Veterinaria.Usuarios.model.Rol;
import com.Veterinaria.Usuarios.model.Usuario;
import com.Veterinaria.Usuarios.repository.UsuarioRepository;
import com.Veterinaria.Usuarios.security.JwtService;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository repository;

    private JwtService jwtService;
    private UsuarioService service;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService("VeterinariaSanMarcosClaveSecretaJwt2026", 60000);
        service = new UsuarioService(repository, jwtService);
    }

    @Test
    @DisplayName("1. registrar crea el usuario con rol CLIENTE, contraseña cifrada y token JWT")
    void registrar_asignaRolClienteYDevuelveToken() {
        when(repository.existsByCorreo("ana@mail.com")).thenReturn(false);
        when(repository.save(any(Usuario.class))).thenAnswer(inv -> {
            Usuario u = inv.getArgument(0);
            u.setId(3L);
            return u;
        });

        AuthResponse respuesta = service.registrar(new RegistroRequest("Ana", "Ana@Mail.com", "clave"));

        assertEquals(Rol.CLIENTE, respuesta.usuario().getRol());
        assertEquals("ana@mail.com", respuesta.usuario().getCorreo());
        assertNotEquals("clave", respuesta.usuario().getContrasena());
        Claims claims = jwtService.validar(respuesta.token());
        assertEquals("ana@mail.com", claims.getSubject());
        assertEquals("CLIENTE", claims.get("rol", String.class));
        assertEquals("Ana", claims.get("nombre", String.class));
    }

    @Test
    @DisplayName("2. registrar rechaza un correo que ya existe")
    void registrar_conCorreoExistente_lanzaExcepcion() {
        when(repository.existsByCorreo("admin@sanmarcos.cl")).thenReturn(true);

        IllegalStateException ex = assertThrows(IllegalStateException.class,
                () -> service.registrar(new RegistroRequest("Otro", "admin@sanmarcos.cl", "1234")));

        assertEquals("Ya existe una cuenta con ese correo", ex.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("3. login con credenciales válidas devuelve token con el rol del usuario")
    void login_conCredencialesValidas_devuelveToken() {
        Usuario admin = new Usuario(1L, "Administrador", "admin@sanmarcos.cl", new BCryptPasswordEncoder().encode("1234"), Rol.ADMIN);
        when(repository.findByCorreo("admin@sanmarcos.cl")).thenReturn(Optional.of(admin));

        Optional<AuthResponse> respuesta = service.login(new LoginRequest("admin@sanmarcos.cl", "1234"));

        assertTrue(respuesta.isPresent());
        assertEquals("ADMIN", jwtService.validar(respuesta.get().token()).get("rol", String.class));
    }

    @Test
    @DisplayName("4. login con contraseña incorrecta no devuelve token")
    void login_conContrasenaIncorrecta_retornaVacio() {
        Usuario cliente = new Usuario(2L, "Cliente", "tengosueno@gmail.com", new BCryptPasswordEncoder().encode("1234"), Rol.CLIENTE);
        when(repository.findByCorreo("tengosueno@gmail.com")).thenReturn(Optional.of(cliente));

        assertTrue(service.login(new LoginRequest("tengosueno@gmail.com", "mala")).isEmpty());
    }

    @Test
    @DisplayName("5. crear rechaza un correo con formato inválido")
    void crear_conCorreoInvalido_lanzaExcepcion() {
        Usuario invalido = new Usuario(null, "Pedro", "correo-sin-arroba", "1234", Rol.CLIENTE);

        assertThrows(IllegalArgumentException.class, () -> service.crear(invalido));
        verify(repository, never()).save(any());
    }
}
