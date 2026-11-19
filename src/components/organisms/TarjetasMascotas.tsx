import React from 'react';
import { Link } from 'react-router-dom';
import type { Mascota } from '../../types';
import { Estado } from '../atoms/Estado';

interface TarjetasMascotasProps {
  mascotas: Mascota[];
}

export const TarjetasMascotas: React.FC<TarjetasMascotasProps> = ({ mascotas }) => {
  const imagenPorDefecto = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=150';

  return (
    <div className="row g-4">
      {mascotas.map((mascota) => (
        <div key={mascota.id} className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={mascota.imagen || imagenPorDefecto}
                    alt={mascota.nombre}
                    className="rounded-circle border"
                    style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                  />
                  <h5 className="card-title mb-0 fw-bold">{mascota.nombre}</h5>
                </div>

                <Estado estado={mascota.estado} />
              </div>

              <p className="card-text text-muted mb-1">
                {mascota.especie} · {mascota.raza}
              </p>
              <p className="card-text mb-3">Dueño: {mascota.dueno}</p>

              <div className="mt-auto">
                <Link to={`/detalle/${mascota.id}`} className="btn btn-outline-primary btn-sm">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};