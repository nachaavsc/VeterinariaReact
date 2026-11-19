import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  opciones: { label: string; value: string }[];
  tieneError?: boolean;
}

export const Select: React.FC<SelectProps> = ({ opciones, tieneError = false, className = '', ...props }) => (
  <select className={`form-select ${tieneError ? 'is-invalid' : ''} ${className}`.trim()} {...props}>
    {opciones.map((op) => (
      <option key={op.value} value={op.value}>{op.label}</option>
    ))}
  </select>
);
