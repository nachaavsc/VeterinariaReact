import React from 'react';

interface AlertaProps {
  tipo: 'success' | 'danger' | 'info' | 'warning';
  mensaje: string;
  alCerrar?: () => void;
}

export const Alerta: React.FC<AlertaProps> = ({ tipo, mensaje, alCerrar }) => {
  if (!mensaje) return null;

  return (
    <div className={`alert alert-${tipo} d-flex justify-content-between align-items-start`} role={tipo === 'danger' ? 'alert' : 'status'}>
      <span>{mensaje}</span>
      {alCerrar && <button type="button" className="btn-close ms-3" aria-label="Cerrar" onClick={alCerrar}></button>}
    </div>
  );
};
