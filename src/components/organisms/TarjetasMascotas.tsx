import React from 'react';
import { Link } from 'react-router-dom';
import type { Mascota } from '../../types';
import { Estado } from '../atoms/Estado';

interface TarjetasMascotasProps {
  mascotas: Mascota[];
}

export const TarjetasMascotas: React.FC<TarjetasMascotasProps> = ({ mascotas }) => (
  <div className="row g-4">
    {mascotas.map((mascota) => (
      <div key={mascota.id} className="col-md-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0">{mascota.nombre}</h5>
              <Estado estado={mascota.estado} />
            </div>
            <p className="card-text text-muted mb-1">{mascota.especie} · {mascota.raza}</p>
            <p className="card-text">Dueño: {mascota.dueno}</p>
            <Link to={`/detalle/${mascota.id}`} className="btn btn-outline-primary btn-sm">Ver detalle</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);
