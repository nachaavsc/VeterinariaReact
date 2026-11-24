import React, { useState } from 'react';
import { Confirmacion } from '../molecules/Confirmacion';
import { Retroalimentacion } from '../molecules/Retroalimentacion';
import { Alerta } from '../atoms/Alerta';
import { Boton } from '../atoms/Boton';
import { Cargando } from '../atoms/Cargando';
import { mensajesApi } from '../../services/repositorios';
import { useRecurso } from '../../hooks/useRecurso';
import { useAccion } from '../../hooks/useAccion';
import type { Mensaje } from '../../types';

const SIN_MENSAJES: Mensaje[] = [];

const formatearFecha = (fecha: string) => new Date(fecha).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });

export const AdminMensajes: React.FC = () => {
  const { datos: mensajes, cargando, error, recargar } = useRecurso(mensajesApi.listar, SIN_MENSAJES);
  const { enviando, exito, error: errorAccion, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);

  const ordenados = [...mensajes].sort((a, b) => b.fechaEnvio.localeCompare(a.fechaEnvio));

  const marcarLeido = async (id: number) => {
    if (await ejecutar(() => mensajesApi.marcarLeido(id), 'Mensaje marcado como leído.')) recargar();
  };

  const confirmarEliminacion = async () => {
    if (idAEliminar === null) return;
    const id = idAEliminar;
    setIdAEliminar(null);
    if (await ejecutar(() => mensajesApi.eliminar(id), 'El mensaje fue eliminado.')) recargar();
  };

  return (
    <div>
      <Retroalimentacion exito={exito} error={errorAccion} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
      <Alerta tipo="danger" mensaje={error} />

      {cargando ? (
        <Cargando texto="Cargando mensajes..." />
      ) : ordenados.length === 0 ? (
        <div className="alert alert-info text-center">No hay mensajes recibidos.</div>
      ) : (
        <div className="list-group shadow-sm">
          {ordenados.map((m) => (
            <div key={m.id} className={`list-group-item ${m.leido ? '' : 'list-group-item-warning'}`}>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h6 className="mb-1 fw-bold">
                    {m.nombreRemitente} <small className="text-muted fw-normal">· {m.email}{m.telefono ? ` · ${m.telefono}` : ''}</small>
                  </h6>
                  <p className="mb-1">{m.contenido}</p>
                  <small className="text-muted">{formatearFecha(m.fechaEnvio)}</small>
                </div>
                <div className="d-flex gap-2 flex-shrink-0">
                  {!m.leido && (
                    <Boton variante="success" texto="Marcar leído" className="btn-sm" disabled={enviando} onClick={() => marcarLeido(m.id)} />
                  )}
                  <Boton variante="danger" texto="Eliminar" className="btn-sm" disabled={enviando} onClick={() => setIdAEliminar(m.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Confirmacion
        mostrar={idAEliminar !== null}
        mensaje="¿Deseas eliminar este mensaje de forma permanente?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
