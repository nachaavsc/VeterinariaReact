import React from 'react';
import { useAuth } from '../../context/useAuth';

export const BotonSesion: React.FC = () => {
  const { usuario, abrirModal, logout } = useAuth();

  if (!usuario) {
    return (
      <button type="button" className="btn btn-primary btn-sm shadow boton-sesion" onClick={abrirModal}>
        <i className="bi bi-person-circle me-1"></i>Ingresar
      </button>
    );
  }

  return (
    <div className="boton-sesion d-flex align-items-center gap-2 bg-white rounded-pill shadow px-3 py-1">
      <i className="bi bi-person-circle text-primary"></i>
      <span className="small fw-semibold">{usuario.nombre}</span>
      <span className={`badge ${usuario.rol === 'ADMIN' ? 'badge-admin' : 'badge-especialidad'}`}>
        {usuario.rol === 'ADMIN' ? 'Admin' : 'Cliente'}
      </span>
      <button type="button" className="btn btn-sm btn-outline-danger py-0" onClick={logout} aria-label="Cerrar sesión">
        <i className="bi bi-box-arrow-right"></i>
      </button>
    </div>
  );
};
