import React from 'react';
import { EstadoMascota } from '../../services/tipos';

export const Estado: React.FC<{ estado: EstadoMascota }> = ({ estado }) => {
  const colorMap: Record<EstadoMascota, string> = {
    Atendido: 'bg-success',
    Pendiente: 'bg-warning text-dark',
    'En Tratamiento': 'bg-info text-dark'
  };
  return <span className={`badge ${colorMap[estado] || 'bg-secondary'}`}>{estado}</span>;
};