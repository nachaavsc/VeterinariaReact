import React from 'react';
import { ErrorMensajes } from '../atoms/ErrorMensaje';

interface CampoFormularioProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

export const CampoFormulario: React.FC<CampoFormularioProps> = ({ label, htmlFor, error, children }) => (
  <div className="mb-3">
    <label className="form-label fw-bold" htmlFor={htmlFor}>{label}</label>
    {children}
    <ErrorMensajes mensaje={error} />
  </div>
);
