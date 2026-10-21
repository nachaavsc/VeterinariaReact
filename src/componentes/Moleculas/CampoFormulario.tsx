import React from 'react';
import { ErrorMensajes } from '../Atomos/ErrorMensaje';

interface CampoFormularioProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const CampoFormulario: React.FC<CampoFormularioProps> = ({ label, error, children }) => (
  <div className="mb-3">
    <label className="form-label fw-bold">{label}</label>
    {children}
    <ErrorMensajes mensaje={error} />
  </div>
);