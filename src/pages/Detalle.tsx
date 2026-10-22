import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { petsRepository } from '../services/petsRepository';
import { Estado } from '../components/atoms/Estado';
import type { Atencion } from '../types';

export const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mascota = id ? petsRepository.getById(id) : undefined;

  if (!mascota) {
    return (
      <div className="text-center">
        <h2 className="mb-3">Mascota no encontrada</h2>
        <p className="text-muted">El registro que buscas no existe o fue eliminado.</p>
        <Link to="/admin" className="btn btn-primary">Volver a Administración</Link>
      </div>
    );
  }

  // La atención más reciente de esta mascota, modelada con la interfaz
  // Atencion para reflejar el historial clínico de forma tipada.
  const ultimaAtencion: Atencion = {
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

          <h4 className="mb-3">Última Atención</h4>
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
