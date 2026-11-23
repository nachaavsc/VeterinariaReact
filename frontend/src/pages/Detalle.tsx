import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { petsRepository } from '../services/petsRepository';
import { API, peticion } from '../services/api';
import { Estado } from '../components/atoms/Estado';
import type { Atencion } from '../types';

type AtencionApi = Omit<Atencion, 'id' | 'mascotaId'> & { id: number; mascotaId: number };

export const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setVersion] = useState(0);
  const [historial, setHistorial] = useState<Atencion | null>(null);
  const mascota = id ? petsRepository.obtenerPorId(id) : undefined;

  useEffect(() => {
    if (!id) return;
    petsRepository.sincronizar().then(() => setVersion((v) => v + 1));
    peticion<AtencionApi[]>(`${API.historial}/mascota/${id}`)
      .then(([ultima]) => {
        if (!ultima) return;
        setHistorial({
          ...ultima,
          id: String(ultima.id),
          mascotaId: String(ultima.mascotaId),
          fecha: new Date(`${ultima.fecha}T00:00:00`).toLocaleDateString('es-CL')
        });
      })
      .catch(() => undefined);
  }, [id]);

  if (!mascota) {
    return (
      <div className="text-center">
        <h2 className="mb-3">Mascota no encontrada</h2>
        <p className="text-muted">El registro que buscas no existe o fue eliminado.</p>
        <Link to="/admin" className="btn btn-primary">Volver a Administración</Link>
      </div>
    );
  }

  const ultimaAtencion: Atencion = historial ?? {
    id: `atencion-${mascota.id}`,
    mascotaId: mascota.id,
    fecha: new Date().toLocaleDateString('es-CL'),
    motivo: mascota.descripcion || 'Sin observaciones registradas.',
    veterinario: 'Dr. Roberto Gómez',
    estado: mascota.estado,
    observaciones: mascota.descripcion
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2 className="mb-0">{mascota.nombre}</h2>
            <Estado estado={mascota.estado} />
          </div>
          <p><strong>Especie:</strong> {mascota.especie}</p>
          <p><strong>Raza:</strong> {mascota.raza}</p>
          <p><strong>Dueño:</strong> {mascota.dueno}</p>
          <p><strong>Email del Dueño:</strong> {mascota.emailDueno}</p>

          <hr className="my-4" />

          <h4 className="text-primary mb-3">Última Atención</h4>
          <p><strong>Fecha:</strong> {ultimaAtencion.fecha}</p>
          <p><strong>Veterinario:</strong> {ultimaAtencion.veterinario}</p>
          <p><strong>Motivo:</strong> {ultimaAtencion.motivo}</p>

          <div className="mt-4">
            <Link to="/admin" className="btn btn-outline-secondary">Volver a Administración</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
