import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/"> Veterinaria</Link>
      <div className="navbar-nav ms-auto flex-row gap-3">
        <Link className="nav-link text-white" to="/">Inicio</Link>
        <Link className="nav-link text-white" to="/registro">Registrar Cita</Link>
        <Link className="nav-link text-white" to="/admin">Administración</Link>
        <Link className="nav-link text-white" to="/contacto">Contacto</Link>
      </div>
    </div>
  </nav>
);
