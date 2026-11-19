import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tieneError?: boolean;
}

export const Input: React.FC<InputProps> = ({ tieneError = false, className = '', ...props }) => (
  <input className={`form-control ${tieneError ? 'is-invalid' : ''} ${className}`.trim()} {...props} />
);
