import React, { useState } from 'react';
import { BarraBusqueda } from '../molecules/BarraBusqueda';
import { Confirmacion } from '../molecules/Confirmacion';
import { Retroalimentacion } from '../molecules/Retroalimentacion';
import { Alerta } from '../atoms/Alerta';
import { Cargando } from '../atoms/Cargando';
import { TablaMascotas } from './TablaMascotas';
import { FormularioMascotas } from './FormularioMascotas';
import { filtrarMascotas, mascotasApi } from '../../services/repositorios';
import { useRecurso } from '../../hooks/useRecurso';
import { useAccion } from '../../hooks/useAccion';
import type { Mascota, MascotaInput } from '../../types';

const SIN_MASCOTAS: Mascota[] = [];

export const AdminMascotas: React.FC = () => {
  const { datos: mascotas, cargando, error, recargar } = useRecurso(mascotasApi.listar, SIN_MASCOTAS);
  const { enviando, exito, error: errorAccion, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [busqueda, setBusqueda] = useState('');
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [editando, setEditando] = useState<Mascota | null>(null);

  const guardarEdicion = async (datos: MascotaInput) => {
    if (!editando) return;
    const id = editando.id;
    if (await ejecutar(() => mascotasApi.actualizar(id, datos), (m) => `Los datos de ${m.nombre} se actualizaron correctamente.`)) {
      setEditando(null);
      recargar();
    }
  };

  const confirmarEliminacion = async () => {
    if (idAEliminar === null) return;
    const id = idAEliminar;
    setIdAEliminar(null);
    if (await ejecutar(() => mascotasApi.eliminar(id), 'La mascota fue eliminada de la base de datos.')) recargar();
  };

  return (
    <div>
      <Retroalimentacion exito={exito} error={errorAccion} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
      <Alerta tipo="danger" mensaje={error} />

      {editando ? (
        <div className="mb-4">
          <h4 className="mb-3">Editar a {editando.nombre}</h4>
          <FormularioMascotas
            key={editando.id}
            datosIniciales={editando}
            alGuardar={guardarEdicion}
            alCancelar={() => setEditando(null)}
            enviando={enviando}
          />
        </div>
      ) : (
        <>
          <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />
          {cargando ? (
            <Cargando texto="Cargando mascotas..." />
          ) : (
            <TablaMascotas mascotas={filtrarMascotas(mascotas, busqueda)} alEditar={setEditando} alEliminar={setIdAEliminar} />
          )}
        </>
      )}

      <Confirmacion
        mostrar={idAEliminar !== null}
        mensaje="¿Estás seguro de que deseas eliminar este registro de la base de datos?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
