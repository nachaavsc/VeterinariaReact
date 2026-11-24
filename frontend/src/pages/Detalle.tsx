import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { equipoApi, historialApi, mascotasApi } from '../services/repositorios';
import { useAuth } from '../context/useAuth';
import { useRecurso } from '../hooks/useRecurso';
import { useAccion } from '../hooks/useAccion';
import { Estado } from '../components/atoms/Estado';
import { Alerta } from '../components/atoms/Alerta';
import { Boton } from '../components/atoms/Boton';
import { Cargando } from '../components/atoms/Cargando';
import { Confirmacion } from '../components/molecules/Confirmacion';
import { Retroalimentacion } from '../components/molecules/Retroalimentacion';
import { FormularioAtencion } from '../components/organisms/FormularioAtencion';
import type { Atencion, AtencionInput, Mascota, Veterinario } from '../types';

const SIN_ATENCIONES: Atencion[] = [];
const SIN_VETERINARIOS: Veterinario[] = [];

const formatearFecha = (fecha: string) => new Date(`${fecha}T00:00:00`).toLocaleDateString('es-CL');

const listarVeterinariosActivos = () => equipoApi.listar().then((lista) => lista.filter((v) => v.activo));

export const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mascotaId = Number(id);
  const { rol } = useAuth();
  const esAdmin = rol === 'ADMIN';
  const rutaVolver = esAdmin ? '/admin' : '/mascotas-clientes';

  const cargarMascota = useCallback(() => mascotasApi.obtener(mascotaId), [mascotaId]);
  const cargarHistorial = useCallback(() => historialApi.listarPorMascota(mascotaId), [mascotaId]);
  const cargarVeterinarios = useCallback(() => (esAdmin ? listarVeterinariosActivos() : Promise.resolve(SIN_VETERINARIOS)), [esAdmin]);

  const mascota = useRecurso<Mascota | null>(cargarMascota, null);
  const historial = useRecurso(cargarHistorial, SIN_ATENCIONES);
  const veterinarios = useRecurso(cargarVeterinarios, SIN_VETERINARIOS);
  const { enviando, exito, error, ejecutar, limpiarExito, limpiarError } = useAccion();
  const [versionFormulario, setVersionFormulario] = useState(0);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);

  const registrarAtencion = async (datos: AtencionInput) => {
    if (await ejecutar(() => historialApi.crear(datos), 'La atención se registró correctamente.')) {
      setVersionFormulario((v) => v + 1);
      historial.recargar();
    }
  };

  const confirmarEliminacion = async () => {
    if (idAEliminar === null) return;
    const atencionId = idAEliminar;
    setIdAEliminar(null);
    if (await ejecutar(() => historialApi.eliminar(atencionId), 'La atención fue eliminada del historial.')) historial.recargar();
  };

  if (mascota.cargando) return <Cargando texto="Cargando mascota..." />;

  if (!mascota.datos) {
    return (
      <div className="text-center">
        <h2 className="mb-3">Mascota no encontrada</h2>
        <p className="text-muted">{mascota.error || 'El registro que buscas no existe o fue eliminado.'}</p>
        <Link to={rutaVolver} className="btn btn-primary">Volver</Link>
      </div>
    );
  }

  const { nombre, especie, raza, dueno, emailDueno, estado } = mascota.datos;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2 className="mb-0">{nombre}</h2>
            <Estado estado={estado} />
          </div>
          <p><strong>Especie:</strong> {especie}</p>
          <p><strong>Raza:</strong> {raza}</p>
          <p><strong>Dueño:</strong> {dueno}</p>
          <p><strong>Email del Dueño:</strong> {emailDueno}</p>

          <hr className="my-4" />

          <h4 className="text-primary mb-3">Historial de Atenciones</h4>
          <Retroalimentacion exito={exito} error={error} alCerrarExito={limpiarExito} alCerrarError={limpiarError} />
          <Alerta tipo="danger" mensaje={historial.error || veterinarios.error} />

          {esAdmin && (
            <FormularioAtencion
              key={versionFormulario}
              mascotaId={mascotaId}
              veterinarios={veterinarios.datos}
              alGuardar={registrarAtencion}
              enviando={enviando}
            />
          )}

          {historial.cargando ? (
            <Cargando texto="Cargando historial..." />
          ) : historial.datos.length === 0 ? (
            <p className="text-muted">Esta mascota aún no tiene atenciones registradas.</p>
          ) : (
            <ul className="list-group mb-2">
              {historial.datos.map((atencion) => (
                <li key={atencion.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <strong>{formatearFecha(atencion.fecha)}</strong> · {atencion.motivo}
                      <div className="small text-muted">{atencion.veterinario}</div>
                      {atencion.observaciones && <div className="small">{atencion.observaciones}</div>}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Estado estado={atencion.estado} />
                      {esAdmin && (
                        <Boton variante="danger" texto="Eliminar" className="btn-sm" disabled={enviando} onClick={() => setIdAEliminar(atencion.id)} />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <Link to={rutaVolver} className="btn btn-outline-secondary">Volver</Link>
          </div>
        </div>
      </div>

      <Confirmacion
        mostrar={idAEliminar !== null}
        mensaje="¿Deseas eliminar esta atención del historial?"
        alConfirmar={confirmarEliminacion}
        alCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};
