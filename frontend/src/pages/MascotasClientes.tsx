import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { filtrarMascotas, mascotasApi } from '../services/repositorios';
import { useRecurso } from '../hooks/useRecurso';
import { Estado } from '../components/atoms/Estado';
import { Alerta } from '../components/atoms/Alerta';
import { Cargando } from '../components/atoms/Cargando';
import type { Mascota } from '../types';

const SIN_MASCOTAS: Mascota[] = [];

export const MascotasClientes: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const { datos: mascotas, cargando, error } = useRecurso(mascotasApi.listar, SIN_MASCOTAS);

  const resultados = filtrarMascotas(mascotas, busqueda);

  return (
    <div>
      <h2 className="mb-4 text-center text-primary">Directorio de Mascotas y Clientes</h2>

      <div className="input-group mb-4">
        <span className="input-group-text"><i className="bi bi-search"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por mascota, dueño o especie..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <Alerta tipo="danger" mensaje={error} />

      {cargando ? (
        <Cargando texto="Cargando mascotas..." />
      ) : resultados.length === 0 ? (
        <p className="text-muted text-center">No se encontraron coincidencias.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>Mascota</th>
                <th>Especie / Raza</th>
                <th>Cliente (Dueño)</th>
                <th>Contacto</th>
                <th>Estado</th>
                <th className="text-end">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((mascota) => (
                <tr key={mascota.id}>
                  <td className="fw-bold">{mascota.nombre}</td>
                  <td>{mascota.especie} · {mascota.raza}</td>
                  <td>{mascota.dueno}</td>
                  <td>{mascota.emailDueno}</td>
                  <td><Estado estado={mascota.estado} /></td>
                  <td className="text-end">
                    <Link to={`/detalle/${mascota.id}`} className="btn btn-sm btn-outline-primary">Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
