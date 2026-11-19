import React from 'react';

interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'outline-primary';
  texto: string;
}

export const Boton: React.FC<BotonProps> = ({ variante = 'primary', texto, className = '', ...props }) => (
  <button className={`btn btn-${variante} ${className}`.trim()} {...props}>
    {texto}
  </button>
);
