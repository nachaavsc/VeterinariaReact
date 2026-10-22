import React, { useState } from 'react';
import { petsRepository } from '../services/petsRepository';
import { Estado } from '../components/atoms/Estado';

export const MascotasClientes: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');

  const resultados = petsRepository.buscar(busqueda);

  return (
    <div>
      <h2 className="mb-4 text-center">Directorio de Mascotas y Clientes</h2>

      <div className="input-group mb-4">
        <span className="input-group-text">🔍</span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por mascota, dueño o especie..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {resultados.length === 0 ? (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
