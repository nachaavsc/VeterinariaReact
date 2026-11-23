package com.Veterinaria.Usuarios.service;

import com.Veterinaria.Usuarios.dto.AuthResponse;
import com.Veterinaria.Usuarios.dto.LoginRequest;
import com.Veterinaria.Usuarios.dto.RegistroRequest;
import com.Veterinaria.Usuarios.model.Rol;
import com.Veterinaria.Usuarios.model.Usuario;
import com.Veterinaria.Usuarios.repository.UsuarioRepository;
import com.Veterinaria.Usuarios.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository repository, JwtService jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }

    public Optional<AuthResponse> login(LoginRequest datos) {
        if (datos.correo() == null || datos.contrasena() == null) {
            return Optional.empty();
        }
        return repository.findByCorreo(normalizar(datos.correo()))
                .filter(usuario -> encoder.matches(datos.contrasena(), usuario.getContrasena()))
                .map(usuario -> new AuthResponse(jwtService.generar(usuario), usuario));
    }

    public AuthResponse registrar(RegistroRequest datos) {
        Usuario nuevo = crear(new Usuario(null, datos.nombre(), datos.correo(), datos.contrasena(), Rol.CLIENTE));
        return new AuthResponse(jwtService.generar(nuevo), nuevo);
    }

    public List<Usuario> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Usuario crear(Usuario usuario) {
        validar(usuario);
        String correo = normalizar(usuario.getCorreo());
        if (repository.existsByCorreo(correo)) {
            throw new IllegalStateException("Ya existe una cuenta con ese correo");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        usuario.setId(null);
        usuario.setNombre(usuario.getNombre().trim());
        usuario.setCorreo(correo);
        usuario.setContrasena(encoder.encode(usuario.getContrasena()));
        if (usuario.getRol() == null) {
            usuario.setRol(Rol.CLIENTE);
        }
        return repository.save(usuario);
    }

    public Optional<Usuario> actualizar(Long id, Usuario datos) {
        validar(datos);
        return repository.findById(id).map(actual -> {
            actual.setNombre(datos.getNombre().trim());
            actual.setCorreo(normalizar(datos.getCorreo()));
            if (datos.getRol() != null) {
                actual.setRol(datos.getRol());
            }
            if (datos.getContrasena() != null && !datos.getContrasena().isBlank()) {
                actual.setContrasena(encoder.encode(datos.getContrasena()));
            }
            return repository.save(actual);
        });
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    private void validar(Usuario usuario) {
        if (usuario.getNombre() == null || usuario.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (usuario.getCorreo() == null || !usuario.getCorreo().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Ingrese un correo electrónico válido");
        }
    }

    private String normalizar(String correo) {
        return correo.trim().toLowerCase();
    }
}
