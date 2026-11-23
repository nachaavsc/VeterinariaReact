package com.Veterinaria.Usuarios.config;

import com.Veterinaria.Usuarios.model.Rol;
import com.Veterinaria.Usuarios.model.Usuario;
import com.Veterinaria.Usuarios.repository.UsuarioRepository;
import com.Veterinaria.Usuarios.service.UsuarioService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository repository;
    private final UsuarioService service;

    public DataLoader(UsuarioRepository repository, UsuarioService service) {
        this.repository = repository;
        this.service = service;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        service.crear(new Usuario(null, "Administrador", "admin@sanmarcos.cl", "1234", Rol.ADMIN));
        service.crear(new Usuario(null, "Cliente San Marcos", "tengosueno@gmail.com", "1234", Rol.CLIENTE));
    }
}
