import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const enlaceClase = ({ isActive }: { isActive: boolean }) =>
  `nav-link text-white ${isActive ? 'fw-bold text-decoration-underline' : ''}`;

export const Navbar: React.FC = () => {
  const { rol } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-veterinaria shadow-sm mb-4">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/"><i className="bi bi-heart-pulse-fill me-2"></i>Veterinaria San Marcos</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Mostrar/ocultar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarPrincipal">
          <div className="navbar-nav ms-auto gap-lg-3">
            <NavLink className={enlaceClase} to="/">Inicio</NavLink>
            <NavLink className={enlaceClase} to="/servicios">Servicios</NavLink>
            <NavLink className={enlaceClase} to="/novedades">Novedades</NavLink>
            <NavLink className={enlaceClase} to="/equipo">Equipo</NavLink>
            {rol && <NavLink className={enlaceClase} to="/mascotas-clientes">Mascotas y Clientes</NavLink>}
            {rol && <NavLink className={enlaceClase} to="/registro">Registrar Cita</NavLink>}
            {rol === 'ADMIN' && <NavLink className={enlaceClase} to="/admin">Administración</NavLink>}
            <NavLink className={enlaceClase} to="/contacto">Contacto</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
