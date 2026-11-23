package com.Veterinaria.Usuarios.dto;

import com.Veterinaria.Usuarios.model.Usuario;

public record AuthResponse(String token, Usuario usuario) {
}
