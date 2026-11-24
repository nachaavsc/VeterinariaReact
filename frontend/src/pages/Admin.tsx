import React, { useState } from 'react';
import { AdminMascotas } from '../components/organisms/AdminMascotas';
import { AdminMensajes } from '../components/organisms/AdminMensajes';
import { AdminServicios } from '../components/organisms/AdminServicios';
import { AdminEquipo } from '../components/organisms/AdminEquipo';

const PESTANAS = [
  { id: 'mascotas', titulo: 'Mascotas', icono: 'bi-heart', Panel: AdminMascotas },
  { id: 'mensajes', titulo: 'Mensajes', icono: 'bi-envelope', Panel: AdminMensajes },
  { id: 'servicios', titulo: 'Servicios', icono: 'bi-clipboard2-pulse', Panel: AdminServicios },
  { id: 'equipo', titulo: 'Equipo', icono: 'bi-people', Panel: AdminEquipo }
];

export const Admin: React.FC = () => {
  const [activa, setActiva] = useState(PESTANAS[0].id);
  const { Panel } = PESTANAS.find((p) => p.id === activa) ?? PESTANAS[0];

  return (
    <div>
      <h2 className="text-primary mb-4">Panel de Administración</h2>

      <ul className="nav nav-tabs mb-4">
        {PESTANAS.map((p) => (
          <li className="nav-item" key={p.id}>
            <button type="button" className={`nav-link ${activa === p.id ? 'active' : ''}`} onClick={() => setActiva(p.id)}>
              <i className={`bi ${p.icono} me-1`}></i>{p.titulo}
            </button>
          </li>
        ))}
      </ul>

      <Panel />
    </div>
  );
};
