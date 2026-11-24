import React from 'react';
import { Alerta } from '../atoms/Alerta';

interface RetroalimentacionProps {
  exito: string;
  error: string;
  alCerrarExito: () => void;
  alCerrarError: () => void;
}

export const Retroalimentacion: React.FC<RetroalimentacionProps> = ({ exito, error, alCerrarExito, alCerrarError }) => (
  <>
    <Alerta tipo="success" mensaje={exito} alCerrar={alCerrarExito} />
    <Alerta tipo="danger" mensaje={error} alCerrar={alCerrarError} />
  </>
);
