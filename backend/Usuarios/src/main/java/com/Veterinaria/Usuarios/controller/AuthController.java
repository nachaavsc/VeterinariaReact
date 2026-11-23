package com.Veterinaria.Usuarios.controller;

import com.Veterinaria.Usuarios.dto.LoginRequest;
import com.Veterinaria.Usuarios.dto.RegistroRequest;
import com.Veterinaria.Usuarios.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest datos) {
        return service.login(datos)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Correo o contraseña incorrectos")));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest datos) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(datos));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }
}
