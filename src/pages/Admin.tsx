import React, { useState } from 'react';
import { BarraBusqueda } from '../components/molecules/BarraBusqueda';
import { Confirmacion } from '../components/molecules/Confirmacion';
import { TablaMascotas } from '../components/organisms/TablaMascotas';
import { petsRepository } from '../services/petsRepository';
import type { Mascota } from '../types';

export const Admin: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [porEliminar, setPorEliminar] = useState<Mascota | null>(null);
  // Se usa para forzar un re-render tras mutar el repositorio en memoria.
  const [, forzarActualizacion] = useState(0);

  const mascotasFiltradas = petsRepository.search(busqueda);

  const confirmarEliminacion = () => {
    if (!porEliminar) return;
    petsRepository.remove(porEliminar.id);
    setPorEliminar(null);
    forzarActualizacion((n) => n + 1);
  };

  return (
    <div>
      <h2 className="mb-4 text-center">Administración de Mascotas</h2>
      <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />
      <TablaMascotas
        mascotas={mascotasFiltradas}
        alEliminar={(mascota) => setPorEliminar(mascota)}
      />
      <Confirmacion
        mostrar={porEliminar !== null}
        mensaje={`¿Seguro que deseas eliminar el registro de "${porEliminar?.nombre}"?`}
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setPorEliminar(null)}
      />
    </div>
  );
};
