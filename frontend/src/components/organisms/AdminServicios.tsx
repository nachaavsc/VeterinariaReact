import React, { useState } from 'react';
import { Confirmacion } from '../molecules/Confirmacion';
import { Retroalimentacion } from '../molecules/Retroalimentacion';
import { Alerta } from '../atoms/Alerta';
import { Boton } from '../atoms/Boton';
import { Cargando } from '../atoms/Cargando';
import { FormularioServicio } from './FormularioServicio';
import { serviciosApi } from '../../services/repositorios';
import { useRecurso } from '../../hooks/useRecurso';
import { useAccion } from '../../hooks/useAccion';
import { formatearPrecio } from '../../utils/formato';
import type { Servicio, ServicioInput } from '../../types';

const SIN_SERVICIOS: Servicio[] = [];

export const AdminServicios: React.FC = () => {
  const { datos: servicios, cargando, error, recargar } = useRecurso(serviciosApi.listar, SIN_SERVICIOS);
  const { enviando, exito, error: errorAccion, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [editando, setEditando] = useState<Servicio | 'nuevo' | null>(null);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);

  const guardar = async (datos: ServicioInput) => {
    const accion = editando && editando !== 'nuevo'
      ? () => serviciosApi.actualizar(editando.id, datos)
      : () => serviciosApi.crear(datos);
    if (await ejecutar(accion, (s) => `El servicio ${s.nombre} se guardó correctamente.`)) {
      setEditando(null);
      recargar();
    }
  };

  const confirmarEliminacion = async () => {
    if (idAEliminar === null) return;
    const id = idAEliminar;
    setIdAEliminar(null);
    if (await ejecutar(() => serviciosApi.eliminar(id), 'El servicio fue eliminado.')) recargar();
  };

  return (
    <div>
      <Retroalimentacion exito={exito} error={errorAccion} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
      <Alerta tipo="danger" mensaje={error} />

      {editando ? (
        <FormularioServicio
          key={editando === 'nuevo' ? 'nuevo' : editando.id}
          datosIniciales={editando === 'nuevo' ? undefined : editando}
          alGuardar={guardar}
          alCancelar={() => setEditando(null)}
          enviando={enviando}
        />
      ) : (
        <div className="text-end mb-3">
          <Boton texto="Nuevo servicio" onClick={() => setEditando('nuevo')} />
        </div>
      )}

      {cargando ? (
        <Cargando texto="Cargando servicios..." />
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-primary">
              <tr>
                <th>Servicio</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => (
                <tr key={s.id}>
                  <td className="fw-bold"><i className={`bi ${s.icono || 'bi-heart-pulse'} me-2 text-primary`}></i>{s.nombre}</td>
                  <td>{s.categoria}</td>
                  <td>{formatearPrecio(s)}</td>
                  <td>
                    <span className={`badge ${s.activo ? 'bg-success' : 'bg-secondary'}`}>{s.activo ? 'Visible' : 'Oculto'}</span>
                  </td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Boton variante="warning" texto="Editar" className="btn-sm" onClick={() => setEditando(s)} />
                      <Boton variante="danger" texto="Eliminar" className="btn-sm" onClick={() => setIdAEliminar(s.id)} />
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
        mensaje="¿Deseas eliminar este servicio de la base de datos?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
