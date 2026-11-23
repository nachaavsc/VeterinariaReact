package com.Veterinaria.Mensajeria.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    public JwtInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if (!(handler instanceof HandlerMethod metodo)) {
            return true;
        }
        RequiereRol requiere = metodo.getMethodAnnotation(RequiereRol.class);
        if (requiere == null) {
            return true;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return rechazar(response, HttpServletResponse.SC_UNAUTHORIZED, "Token JWT requerido");
        }

        Claims claims;
        try {
            claims = jwtService.validar(header.substring(7));
        } catch (JwtException | IllegalArgumentException e) {
            return rechazar(response, HttpServletResponse.SC_UNAUTHORIZED, "Token JWT inválido o expirado");
        }

        String rol = claims.get("rol", String.class);
        if (requiere.value().length > 0 && !Arrays.asList(requiere.value()).contains(rol)) {
            return rechazar(response, HttpServletResponse.SC_FORBIDDEN, "No tienes permisos para realizar esta operación");
        }

        request.setAttribute("usuario", claims);
        return true;
    }

    private boolean rechazar(HttpServletResponse response, int estado, String mensaje) throws IOException {
        response.setStatus(estado);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"error\":\"" + mensaje + "\"}");
        return false;
    }
}
