import React from 'react';
import type { EstadoAtencion } from '../../types';

const COLOR_POR_ESTADO: Record<EstadoAtencion, string> = {
  Atendido: 'bg-success',
  Pendiente: 'bg-warning text-dark',
  'En Tratamiento': 'bg-info text-dark'
};

export const Estado: React.FC<{ estado: EstadoAtencion }> = ({ estado }) => (
  <span className={`badge ${COLOR_POR_ESTADO[estado] || 'bg-secondary'}`}>{estado}</span>
);
