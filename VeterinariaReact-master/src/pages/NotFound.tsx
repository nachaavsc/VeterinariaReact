import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="text-center py-5">
    <div className="icono-grande mb-3">Upsi</div>
    <h1 className="display-3 fw-bold text-primary">404 - Página no encontrada</h1>
    <p className="lead mt-3">
      Revisa la dirección
      o vuelve al inicio para seguir agendando el cuidado de tu compañero.
    </p>
    <Link to="/" className="btn btn-primary btn-lg mt-3">Volver al Inicio</Link>
  </div>
);
