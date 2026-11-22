import React from 'react';
import { Input } from '../atoms/Input';

interface BarraBusquedaProps {
  valor: string;
  alCambiar: (valor: string) => void;
}

export const BarraBusqueda: React.FC<BarraBusquedaProps> = ({ valor, alCambiar }) => (
  <div className="input-group mb-3">
    <span className="input-group-text">🔍</span>
    <Input
      placeholder="Buscar por nombre de mascota, dueño o especie..."
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
    />
  </div>
);
