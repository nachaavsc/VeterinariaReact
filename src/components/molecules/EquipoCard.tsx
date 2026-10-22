import React, { useState } from 'react';

interface EquipoCardProps {
  nombre: string;
  especialidad: string;
  foto: string;
}

/** Devuelve las iniciales del nombre para el placeholder cuando la foto
 *  real todavía no existe en public/equipo/. */
const obtenerIniciales = (nombre: string): string =>
  nombre
    .replace(/^(Dr\.|Dra\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

export const EquipoCard: React.FC<EquipoCardProps> = ({ nombre, especialidad, foto }) => {
  const [errorCarga, setErrorCarga] = useState(false);

  return (
    <div className="col">
      <div className="card h-100 shadow-sm card-equipo">
        {errorCarga ? (
          <div className="avatar-placeholder">{obtenerIniciales(nombre)}</div>
        ) : (
          <img
            src={foto}
            className="card-img-top"
            alt={nombre}
            onError={() => setErrorCarga(true)}
          />
        )}
        <div className="card-body text-center">
          <h5 className="card-title mb-1">{nombre}</h5>
          <p className="card-text text-muted">{especialidad}</p>
        </div>
      </div>
    </div>
  );
};
