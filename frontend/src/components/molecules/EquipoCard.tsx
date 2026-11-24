import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface EquipoCardProps {
  nombre: string;
  especialidad: string;
  foto: string;
  resena: string;
  experiencia: string;
  email?: string;
  enlaceAgenda?: string;
}

const obtenerIniciales = (nombre: string): string =>
  nombre
    .replace(/^(Dr\.|Dra\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

export const EquipoCard: React.FC<EquipoCardProps> = ({ nombre, especialidad, foto, resena, experiencia, email, enlaceAgenda }) => {
  const [errorCarga, setErrorCarga] = useState(false);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm card-equipo">
        <div className="card-equipo-cabecera"></div>
        <div className="card-body text-center pt-0 d-flex flex-column">
          <div className="avatar-equipo mx-auto mb-3">
            {errorCarga || !foto ? (
              <span>{obtenerIniciales(nombre)}</span>
            ) : (
              <img src={foto} alt={nombre} onError={() => setErrorCarga(true)} />
            )}
          </div>
          <h5 className="card-title fw-bold mb-2">{nombre}</h5>
          <div className="mb-3">
            <span className="badge rounded-pill badge-especialidad px-3 py-2">
              <i className="bi bi-heart-pulse me-1"></i>{especialidad}
            </span>
          </div>
          {experiencia && (
            <small className="text-primary fw-semibold mb-2">
              <i className="bi bi-award me-1"></i>{experiencia}
            </small>
          )}
          <p className="card-text text-muted small flex-grow-1">{resena}</p>
          {email && (
            <a href={`mailto:${email}`} className="small contacto-especialista mb-3">
              <i className="bi bi-envelope me-1"></i>{email}
            </a>
          )}
          {enlaceAgenda && (
            <Link to={enlaceAgenda} className="btn btn-outline-veterinaria btn-principal btn-sm fw-semibold mt-auto">
              <i className="bi bi-calendar-plus me-1"></i>Agendar con especialista
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
