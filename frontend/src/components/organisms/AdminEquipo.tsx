import React, { useState } from 'react';
import { Confirmacion } from '../molecules/Confirmacion';
import { Retroalimentacion } from '../molecules/Retroalimentacion';
import { Alerta } from '../atoms/Alerta';
import { Boton } from '../atoms/Boton';
import { Cargando } from '../atoms/Cargando';
import { FormularioVeterinario } from './FormularioVeterinario';
import { equipoApi } from '../../services/repositorios';
import { useRecurso } from '../../hooks/useRecurso';
import { useAccion } from '../../hooks/useAccion';
import type { Veterinario, VeterinarioInput } from '../../types';

const SIN_VETERINARIOS: Veterinario[] = [];

export const AdminEquipo: React.FC = () => {
  const { datos: veterinarios, cargando, error, recargar } = useRecurso(equipoApi.listar, SIN_VETERINARIOS);
  const { enviando, exito, error: errorAccion, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [editando, setEditando] = useState<Veterinario | 'nuevo' | null>(null);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);

  const guardar = async (datos: VeterinarioInput) => {
    const accion = editando && editando !== 'nuevo'
      ? () => equipoApi.actualizar(editando.id, datos)
      : () => equipoApi.crear(datos);
    if (await ejecutar(accion, (v) => `Los datos de ${v.nombre} se guardaron correctamente.`)) {
      setEditando(null);
      recargar();
    }
  };

  const confirmarEliminacion = async () => {
    if (idAEliminar === null) return;
    const id = idAEliminar;
    setIdAEliminar(null);
    if (await ejecutar(() => equipoApi.eliminar(id), 'El veterinario fue eliminado del equipo.')) recargar();
  };

  return (
    <div>
      <Retroalimentacion exito={exito} error={errorAccion} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
      <Alerta tipo="danger" mensaje={error} />

      {editando ? (
        <FormularioVeterinario
          key={editando === 'nuevo' ? 'nuevo' : editando.id}
          datosIniciales={editando === 'nuevo' ? undefined : editando}
          alGuardar={guardar}
          alCancelar={() => setEditando(null)}
          enviando={enviando}
        />
      ) : (
        <div className="text-end mb-3">
          <Boton texto="Nuevo veterinario" onClick={() => setEditando('nuevo')} />
        </div>
      )}

      {cargando ? (
        <Cargando texto="Cargando equipo..." />
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-primary">
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Email</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {veterinarios.map((v) => (
                <tr key={v.id}>
                  <td className="fw-bold">{v.nombre}</td>
                  <td>{v.especialidad}</td>
                  <td>{v.email}</td>
                  <td>
                    <span className={`badge ${v.activo ? 'bg-success' : 'bg-secondary'}`}>{v.activo ? 'Visible' : 'Oculto'}</span>
                  </td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Boton variante="warning" texto="Editar" className="btn-sm" onClick={() => setEditando(v)} />
                      <Boton variante="danger" texto="Eliminar" className="btn-sm" onClick={() => setIdAEliminar(v.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Confirmacion
        mostrar={idAEliminar !== null}
        mensaje="¿Deseas eliminar a este veterinario del equipo?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
