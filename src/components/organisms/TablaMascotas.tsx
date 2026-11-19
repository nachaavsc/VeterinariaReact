import React from 'react';
import { Link } from 'react-router-dom';
import type { Mascota } from '../../types';
import { Estado } from '../atoms/Estado';
import { Boton } from '../atoms/Boton';

interface TablaMascotasProps {
  mascotas: Mascota[];
  alEliminar: (id: string) => void;
}

export const TablaMascotas: React.FC<TablaMascotasProps> = ({ mascotas, alEliminar }) => {
  if (mascotas.length === 0) {
    return (
      <div className="alert alert-info text-center my-4">
        No se encontraron mascotas registradas o coincidentes con la búsqueda.
      </div>
    );
  }

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0 bg-white">
        <thead className="table-primary">
          <tr>
            <th>Nombre</th>
            <th>Especie / Raza</th>
            <th>Dueño</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td className="fw-bold">{m.nombre}</td>
              <td>{m.especie} - <span className="text-muted">{m.raza}</span></td>
              <td>
                {m.dueno}
                <br />
                <small className="text-muted">{m.emailDueno}</small>
              </td>
              <td>
                <Estado estado={m.estado} />
              </td>
              <td className="text-end">
                <div className="d-flex gap-2 justify-content-end">
                  <Link to={`/detalle/${m.id}`} className="btn btn-sm btn-outline-primary">
                    Ver Detalle
                  </Link>
                  <Boton
                    variante="danger"
                    texto="Eliminar"
                    className="btn-sm"
                    onClick={() => alEliminar(m.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
