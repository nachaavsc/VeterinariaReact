import React from 'react';
import { Link } from 'react-router-dom';
import type { Mascota } from '../../types';
import { Estado } from '../atoms/Estado';
import { Boton } from '../atoms/Boton';

interface TablaMascotasProps {
  mascotas: Mascota[];
  alEliminar: (mascota: Mascota) => void;
}

/** Tabla administrativa con todas las mascotas registradas. */
export const TablaMascotas: React.FC<TablaMascotasProps> = ({ mascotas, alEliminar }) => {
  if (mascotas.length === 0) {
    return <p className="text-muted">No hay mascotas que coincidan con la búsqueda.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie / Raza</th>
            <th>Dueño</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td className="fw-bold">{mascota.nombre}</td>
              <td>{mascota.especie} · {mascota.raza}</td>
              <td>{mascota.dueno}</td>
              <td><Estado estado={mascota.estado} /></td>
              <td className="text-end">
                <div className="d-flex gap-2 justify-content-end">
                  <Link to={`/detalle/${mascota.id}`} className="btn btn-outline-primary btn-sm">Ver</Link>
                  <Boton texto="Eliminar" variante="danger" className="btn-sm" onClick={() => alEliminar(mascota)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
