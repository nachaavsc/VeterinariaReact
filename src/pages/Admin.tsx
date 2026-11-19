import React, { useState } from 'react';
import { BarraBusqueda } from '../components/molecules/BarraBusqueda';
import { Confirmacion } from '../components/molecules/Confirmacion';
import { TablaMascotas } from '../components/organisms/TablaMascotas';
import { petsRepository } from '../services/petsRepository';
import type { Mascota } from '../types';

export const Admin: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const mascotas: Mascota[] = petsRepository.buscar(busqueda);

  const solicitarEliminacion = (id: string) => {
    setIdAEliminar(id);
  };

  const confirmarEliminacion = () => {
    if (idAEliminar) {
      petsRepository.eliminar(idAEliminar);
      setIdAEliminar(null);
      setVersion(version + 1);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Panel de Administración de Mascotas</h2>
      </div>

      <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />

      <TablaMascotas mascotas={mascotas} alEliminar={solicitarEliminacion} />

      <Confirmacion
        mostrar={idAEliminar !== null}
        mensaje="¿Estás seguro de que deseas eliminar este registro de la base de datos?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
